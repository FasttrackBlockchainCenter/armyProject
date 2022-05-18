import React from 'react';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from './hooks';
import { injected, walletconnect } from './connectors';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { 
  NoEthereumProviderError, 
  UserRejectedRequestError as UserRejectedRequestErrorInjected 
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';


export default function() {
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    )
}

function getLibrary(provider) {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}

function ChainId() {
  const { chainId } = useWeb3React()

  return (
    <div>
      <span className="wallet-subtitle">Chain Id</span>
      <span>{Number.isInteger(chainId) ? chainId : ''}</span>
    </div>
  )
}

function BlockNumber() {
  const { chainId, library } = useWeb3React()

  const [blockNumber, setBlockNumber] = React.useState()
  React.useEffect(() => {
    if (!!library) {
      let stale = false

      library
        .getBlockNumber()
        .then((blockNumber) => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null)
          }
        })

      const updateBlockNumber = (blockNumber) => {
        setBlockNumber(blockNumber)
      }
      library.on('block', updateBlockNumber)

      return () => {
        stale = true
        library.removeListener('block', updateBlockNumber)
        setBlockNumber(undefined)
      }
    }
  }, [library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
  return (
    <div>
      <span className="wallet-subtitle">Block Number</span>
      <span>
        {Number.isInteger(blockNumber)
          ? blockNumber.toLocaleString()
          : blockNumber === null
          ? 'Error'
          : !!library
          ? '...'
          : ''}
      </span>
    </div>
  )
}

function Account() {
  const { account } = useWeb3React()

  return (
    <div className="account">
      <span>
        {account === undefined
          ? ''
          : account === null
          ? '-'
          : (<a href={"https://etherscan.io/address/" + account} target="_blank" rel="noopener noreferrer">
                {account}
            </a>)}
      </span>
    </div>
  )
}

function Balance() {
  const { account, library, chainId } = useWeb3React()

  const [balance, setBalance] = React.useState()
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div>
      <span className='wallet-subtitle'>Balance</span>
      <span>
        {!!balance
          ? `${parseFloat(formatEther(balance)).toPrecision(4)}`
          : balance === null
          ? 'Error'
          : account === null
          ? '-'
          : !!account && !!library
          ? '...'
          : ''}
      </span>
    </div>
  )
}

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function WalletData() {
  return(
    <div className="wallet-data">
      <Account/>
      <Balance/>
      <BlockNumber/>
    </div>
  )
}


function App () {
    const context = useWeb3React();
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState();
    React.useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    const currentConnector = injected
    const activating = currentConnector === activatingConnector
    const connected = currentConnector === connector
    const disabled = !triedEager || !!activatingConnector || connected || !!error


    return(
      <div className="web3-card">
        { active ? <WalletData/> : <div className="default">No wallet connected</div> }
        {(!active && !error) && 
          (<button
            color="primary"
            className="wallet-connect"
            style={{
                cursor: disabled ? 'unset' : 'pointer',
            }}
            disabled={disabled}
            onClick={() => {
                setActivatingConnector(currentConnector)
                activate(injected)
            }}
          >
            {activating ? 'Initializing...' : connected ? 'Connected' : 'Connect to a Metamask' }
          </button>)
        } 
        {(!active && !error) && 
          (<button
            color="primary"
            className="wallet-connect"
            style={{
                cursor: disabled ? 'unset' : 'pointer',
            }}
            disabled={disabled}
            onClick={() => {
                setActivatingConnector(walletconnect)
                activate(walletconnect)
            }}
          >
            {activating ? 'Initializing...' : connected ? 'Connected' : 'Connect with WalletConnect' }
          </button>)
          
        } 

        {(active || error) && 
          (<button
            className={ active ? "deactivate-button" : "" }
            onClick={() => {
              // walletconnect.disconnect()
              deactivate()
            }}
          >
            Deactivate
          </button>)
        }
        <span>
          {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
        </span>
      </div>
    )
}