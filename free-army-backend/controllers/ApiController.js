const pool = require('../database');
const env = require('../config/env');
const helpers = require('../lib/helpers.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { 
   encryptPassword
} = require('../lib/helpers.js');
const {
   listenerCount
} = require('../database');

// Helper function for token hash generating

const getToken = (email, password) => {
   let token = null;

   try {
      token = jwt.sign({
         email,
         password
      }, env.JWT_SECRET, {
         algorithm: 'HS256'
      })
      if (token == null) {
         let response = {
            'response': 'error',
            'message': 'Password or email is invalid`',
            'token': token
         };
      }
   } catch (err) {
      let response = {
         'response': 'error',
         'message': 'Token creation failed',
      };
   }
   return token
}

//register **


const signup = async (req, res) => {
    console.log(req.query, req.url, req.body)
    let response;
    let first_name = req.body.first_name,
        last_name = req.body.last_name,
        password = req.body.password,
        email = req.body.email;

    // Check for undefined values
    if (first_name == undefined || last_name == undefined || password == undefined || email == undefined) {
        console.log('error 1');
        response = {
            'success': false,
            'message': 'Data is not defined`',
        };
    } else {

        // Email validation
        if (!(helpers.validateEmail(email))) {

            console.log('error 2');
            response = {
                'success': false,
                'message': 'Email is invalid',
            }; 

        }else {
          console.log('check1')
            // Increase referrals count by 1
            if (req.body.reff != '') {
                pool.query('SELECT * FROM users WHERE email=?', [req.body.reff], async (err, result, fields) => {
                    if (!(err) && result) {
                          result[0].referral_count = result[0].referral_count + 1;
                          await pool.query('UPDATE users SET ? WHERE email=?', [result[0], req.body.reff])
                    } else {
                        throw err
                    }
                })

                pool.query('SELECT * FROM referral WHERE user_email=?', [email], async (err, result, fields) => {

                  console.log(result)
                    if (!(err) && result) {
                          result[0].registered = true;
                          console.log(result[0])
                          await pool.query('UPDATE referral SET ? WHERE user_email=?', [result[0], email])
                    } else {
                        throw err
                    }
                })
            }

            console.log('-----------')

            // New user initial data
            let newUser = {
                first_name: first_name,
                last_name:last_name,
                email:email,
                password: '',
                ethereum_wallet_pub: null,
                bitcoin_wallet_pub: null,
                auth_token: helpers.generateRandomString(40),
                referral_link: env.APP_URL + "/sign-up?ref='" + email,
                // referrer_id: (reffId) ? reffId.id : null,
                verification_token: helpers.generateRandomString(40),
                verified: false
            }

            newUser.password = await helpers.encryptPassword(password)

            console.log(newUser)

            let verifyLink = env.APP_URL + "/login/verify?email=" + newUser.email + '&token=' + newUser.verification_token

            // Send Mail to newUser.email
            const newMail = {
                to: newUser.email,
                subject: 'Verify your account',
                body: `
                        <h3>Verify your account</h3>
                        <p>${verifyLink}</p>
                        `
            }

            let emailSent = helpers.mailSender(newMail)

            if(!emailSent){
                response = {
                    'success': false,
                    'message': 'Couldn\'t send verification email',
                };
    
                return false
            }

            // Token generating
            let token = getToken(newUser.email, newUser.password)

            if (typeof(token) != 'string') {
                response = {
                    'success': false,
                    'message': 'Token generation failed'
                }
            }

            newUser.auth_token = token;
            // User data saving to DB
            await pool.query('INSERT INTO users SET ?', [newUser], async (err, result, fields) => {
                if (err) {
                    console.log(err)
                    response = {
                        'success': false,
                        'message': 'Couldn\'t register user',
                    };
                } else {
                    response = {
                        'success': true,
                        'message': newUser.email,                        
                    };                
                }
                if (response.success) {
                    res.status(200).json(response)
                } else {
                    res.status(500).json(response)
                }
                console.log(response)
            })

        }
    }

    if (response.success) {
        res.status(200).json(response)
    } else {
        res.status(500).json(response)
    }
}


//login **

const login = async (req, res) => {
   let {
      email,
      password
   } = req.body, response

   console.log(email, password)

   // Check user in DB
   await pool.query('SELECT * FROM users WHERE email=?', [email], async (err, result, fields) => {
      if (err) {
         console.log(err);
         return false
      }

      console.log(result)

      if (password && result[0]) {

        let match = await bcrypt.compare(password, result[0].password)

        if (result &&match) {
           // Get new token for user
           let newToken = await getToken(result[0].email, result[0].password);
           result[0].auth_token = newToken;
           //saves the token
           await pool.query('UPDATE users SET ? WHERE email=?', [result[0], email])

           // Success
           response = {
              'success': true,
              'data': {
                 'id': result[0].id,
                 'first_name': result[0].first_name,
                 'last_name': result[0].last_name,
                 'email': result[0].email,
                 'password': result[0].password,
                 'referral_link': result[0].referral_link,
                 'referral_count': result[0].referral_count,
                 'created_at': result[0].created_at,
                 'verification_token': result[0].verification_token,
                 'verified': result[0].verified,
                 'bitcoin_wallet_pub': result[0].bitcoin_wallet_pub,
                 'ethereum_wallet_pub': result[0].ethereum_wallet_pub,
                 'auth_token': result[0].auth_token,
              }
           }
        } else {
            response = {
              'success': false,
              'message': 'Wrong Email or Password',
           }
        }
      } else {
         response = {
            'success': false,
            'message': 'Wrong Email or Password',
         }
      }

      console.log(response)

      if (response.success) {
        res.status(200).json(response)
      } else {
        res.status(500).json(response)
      }
   })
}

//recover account when password is lost **

const recoverAccount = async (req, res) => {
    let response;
   let email = req.body.email

   // Get user info
   await pool.query('SELECT * FROM users WHERE email=?', [email], async (err, result, fields) => {

      if (err) {
         console.log(err)
         response = {
            'success': false,
            'message': 'Wrong Email',
         }
      }

      //create a new verification token
      let reset_token = helpers.generateRandomString(40)

      //Updates the new token
      result[0].reset_token = reset_token

      // Link for recovering
      let recoverAccLink = env.APP_URL + "/new-password?token=" + reset_token+"&email="+email
      // Mail sending
      const newMail = {
         to: email,
         subject: 'Recover your account',
         body: `
            <h3>Recover your account</h3>
            <p>${recoverAccLink}</p>
            `
      }


      await pool.query('UPDATE users SET ? WHERE email=?', [result[0], email], async (erro) => {
         if (erro) {
            console.log(erro)
            response = {
              'success': false,
              'message': 'Wrong Password',
            }         
         }
         //if everything ok it sends the email

         let emailSent = helpers.mailSender(newMail)

         if (!emailSent) {
            response = {
               'success': false,
               'reason': 'Couldn\'t send recovery email',
            };
         } else {
            response = {
                 'success': true,
                 'reason': 'Recovery email sent',
              };
         }


         res.status(200).json(response)
      
      })
   })
}

//Change the password, old password needed **

const changePassword = async (req,res) => {

   let old_password = req.body.old_password
   let new_password = req.body.new_password
   let email = req.body.user_email
   let response
   // Get user

   console.log(old_password)
   console.log(new_password)
   console.log(email)
   await pool.query('SELECT * FROM users WHERE email=?', [email], async (err, result, fields) => {

      if (err) {
         console.error(err)
         response= {
            'success': false,
            'message': 'Error'
         }
      }
      let match = await bcrypt.compare(old_password, result[0].password)
      if (result&&match) {
         // Check password

            // Generate new password and save
            result[0].password = await helpers.encryptPassword(new_password);
            await pool.query('UPDATE users SET ? WHERE email=?', [result[0], email])

            response= {
               'success': true,
               'message': 'Password changed successfuly'
            }
         } else {
            response= {
               'success': false,
               'message': "Password isn't correct"
            }
         }
         res.status(200).json(response)
      })
   
}

//Gets the parameters of the link and verifies **

const verifyAccount = async (req, res) => {
   let response;
   let email = req.body.email
   let token = req.body.token


   // Get data
   await pool.query('SELECT * FROM users WHERE email=?', [email], async (err, result, fields) => {
      if (err) {
         response = {
            'success': false,
            'message': 'User not found or something went wrong'
         }
      }

      if (token == result[0].verification_token) {
         console.log('Equals tokens')
         result[0].verification_token = null;
         result[0].verified = 1

         await pool.query('UPDATE users SET ? WHERE email=?', [result[0], email])

         return {
            'success': true,
            'message': 'Account verified'
         }
      } else {
         response = {
            'success': false,
            'message': 'Tokens are not equals'
         }
      }

      console.log(response)

      if (response.success) {
         res.status(200).json(response)
      } else {
         res.status(500).json(response)
      }
   })
}

//Gets the token of the link and asks for the email and  ** 

const reset_password = async (req, res) => {
    let response;
   let token = req.body.reset_token
   let newPassword = req.body.password
   let email = req.body.email

   console.log(token, newPassword, email)


   await pool.query('SELECT * FROM users WHERE email=?', [email], async (err, result, fields) => {

      if (err) {
         console.log(err)
         response = {
          'success': false,
          'message': 'Something went wrong'
         }
      }
      console.log(result)

      newPassword = await helpers.encryptPassword(newPassword)

      //checks if the tokens are equals
      if(result[0].reset_token==token){

         //Sets the new password and null reset token
         result[0].password = newPassword
         result[0].reset_token = null
         await pool.query('UPDATE users SET ? WHERE email=?', [result[0], email])
          response = {
            'success': true,
            'message': 'Password updated'
          }
      } else{
         response = {
            'success': false,
            'message': 'Tokens are not equals'
          }
      }

      if (response.success) {
         res.status(200).json(response)
      } else {
         res.status(500).json(response)
      }
   })

}

// idk what this does
const updateSettings = async (req, res) => {
  let response;
  let data = req.body;
  let param;
  let searchParam;

  if (req.body.id) {
    param = 'id'
    searchParam = req.body.id;
  } 
  else if (req.body.user_email) {
    param = 'email'
    searchParam = req.body.user_email
  }

  console.log(param)
  console.log(searchParam)

   await pool.query(`SELECT * FROM users WHERE ${param}=?`, [searchParam], async (err, result, fields) => {
      if (err) {
         response = {
            'success': false,
            'message': 'User is not defined'
         }
      } else {
        let newData = result[0];

        // console.log(err)
        // console.log(newData)
        // console.log(fields)

         newData.first_name = data.first_name ? data.first_name : newData.first_name;
         newData.last_name = data.last_name ? data.last_name : newData.last_name;
         newData.email = data.email ? data.email : newData.email;
         newData.ethereum_wallet_pub = data.ethereum_wallet_pub ? data.ethereum_wallet_pub : newData.ethereum_wallet_pub;
         newData.bitcoin_wallet_pub = data.bitcoin_wallet_pub ? data.bitcoin_wallet_pub : newData.bitcoin_wallet_pub;

         // console.log(newData)

         await pool.query(`UPDATE users SET ? WHERE ${param}=?`, [newData, searchParam], async (err, result, fields) => {
            if (err) {
              response = {
                'success': false,
                'message': 'Error saving data'
              }
            } else {
                response = {
                  'success': true,
                  'data': newData
               }
            } 

            res.status(200).json(response)

         })

      }

      res.status(200).json(response)
   })
}


module.exports = {
   signup,
   login,
   changePassword,
   verifyAccount,
   updateSettings,
   recoverAccount,
   reset_password,
   getToken
}