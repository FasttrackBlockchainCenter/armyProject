const pool = require('../database');
const env = require('../config/env');
const helpers = require('../lib/helpers.js');

const inviteFriend = async (req, res) => {
    let response;
    let email = req.body.email,
        friendEmail = req.body.friendEmail,
        name = req.body.name
    await pool.query('SELECT * FROM users WHERE email=?', [email], async (err, result, fields) => {
        if (err) {
            console.log(err)
            response = {
              'success': false,
              'message': 'Something went wrong'
            } 
        }
      
        if(result) {
            let link = result[0].referral_link
          
            const newMail = {
              to: friendEmail,
              subject: `You got an email from ${result[0].first_name}`,
              body: `
              <h3>Hey join with me</h3>
              <p>${link}</p>`
            }
          
            let emailSent = helpers.mailSender(newMail)
          
            if(emailSent){
                response = {
                  'success': true,
                  'message': 'Email was sent'
                } 
            } else{
                response = {
                  'success': false,
                  'message': 'Email was not sent'
                }
            }

            let newRef = {
              'referrer_id': result[0].id,
              'user_email': friendEmail,
              'registered': false
            };

            console.log(newRef)

            await pool.query('INSERT INTO referral SET ?', [newRef], async (err, result, fields) => {
              if (err) {
                response = {
                  'success': false,
                  'message': 'Referral saving error'
                }
              }
            })
        }

        res.status(200).json(response)
    })
}

const getReferrals = async (req, res) => {  
  let response;
  let auth_token = req.body.auth_token;
  await pool.query('SELECT * FROM users WHERE auth_token=?', [auth_token], async (error, user, fieldss) => {
    if(error) {
      response = error
    } else {
      await pool.query('SELECT * FROM referral WHERE referrer_id=?', [user[0].id], async (err, result, fields) => {
        if(err){
          response = false
        } else {
          response = result
        }
        // console.log('check')

        console.log(response)
        res.status(200).json(response)
      })
    }
  })
}

module.exports = {
  inviteFriend,
  getReferrals
}