import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import axios from 'axios';


const useStyles = makeStyles(() => ({
    root: {
        margin: '20px',
        boxShadow: '0 0 13px 0 rgba(82,63,105,.05)',
    },
    cardTitle: {
        color: '#48465b',
        fontWeight: 500,
        fontSize: '1.2rem',
    },
    tableContainer: {
        boxShadow: 'none',
    },
    table: {
        '& td, th': {
            color: '#595d6e',
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: '1.5rem',
            borderColor: '#f0f3ff',
        },
    },
    joined: {
        backgroundColor: 'rgba(29,201,183,.1)',
        color: '#1dc9b7',
        fontWeight: 600,
        padding: '.5rem 1rem',
        borderRadius: '.2rem',
        fontSize: '.85rem',
    },
    pending: {
        backgroundColor: 'rgba(253,57,122,.1)',
        color: '#fd397a',
        fontWeight: 600,
        padding: '.5rem 1rem',
        borderRadius: '.2rem',
        fontSize: '.85rem',
    }
}));


function createData(email, date, completed, earnings) {
    return { email, date, completed, earnings };
}

const ReferralTable = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const [referrals, setReferrals] = useState([]);

    useEffect(() => {

        axios.post(`${process.env.REACT_APP_API_URL}/api/get_referrals`, {auth_token: user.auth_token})
        .then((res) => {
            if ( res.data ) {
                setReferrals(res.data);
                const rows = [];
                for (let i = 0; i < res.data.length; i++) {
                    let date = new Date(res.data[i].created_at).toLocaleDateString("en-US");
                    let item = createData(res.data[i].user_email, date, res.data[i].registered, (res.data[i].registered? 10 : 0) )
                    rows.push(item)
                }

                setReferrals(rows);
            }
        }).catch((error) => {
            console.log(error)
        });
        
    }, []);


    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                title="My referrals"
                className={classes.cardTitle}
            >
            </CardHeader>
            <CardContent>
                <TableContainer
                 component={Paper}
                 className={classes.tableContainer}
                 >
                {referrals.length ?
                    <Table
                     aria-label="simple table"
                     className={classes.table}
                     >
                        <TableHead>
                        <TableRow>
                            <TableCell>Sent</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Earnings</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {referrals.map((row) => (
                            <TableRow key={row.email}>
                            <TableCell component="th" scope="row">
                                {row.email}
                            </TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>
                                {(row.completed ? <span className={classes.joined}>Joined</span> : <span className={classes.pending}>Pending</span> )}
                            </TableCell>
                            <TableCell align="right">{row.earnings}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    :
                    <div align="center">No data to show</div>
                }
                </TableContainer>
            </CardContent>
        </Card>
    );

}

export default ReferralTable;