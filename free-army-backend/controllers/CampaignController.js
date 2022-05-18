const pool = require('../database');
const env = require('../config/env');


// const getCampaigns = async (req, res) => {
//     let auth_token = req.body.auth_token
//     //check if the user exists
//     await pool.query('SELECT * FROM users WHERE auth_token=?', [auth_token], async (err, user_campaigns, fields) => {
    
//         if (err) {
// 			console.error(err)
// 			return {
//                 'success': false,
//                 'message': 'Error'
//             }
// 		}

//         await pool.query('SELECT * from campaigns', (err, all_campaigns, fields) => {
//             if (!(err) && result) {
//                 allCampaigns.forEach(campaign => {
//                     if (user_campaigns != null) {
//                         user_campaigns.forEach(completed => {
//                             if (campaign['id'] == completed['id']) {
//                                 campaign['completed'] = true;
//                             } else {
//                                 campaign['completed'] = false;
//                             }
//                         });
//                     } else {
//                         completed['completed'] = false;
//                     }
//                 });
//             }

//             res.status(200).json(response);
//         })

//         return allCampaigns
//     })
// }

const createCampaign = async (req, res) => {
    
    const newCampaign = {
        duration: req.body.duration,
        purpose: req.body.purpose,
        eachBudget: req.body.eachBudget,
        convType: req.body.conversation,
        target: req.body.target,
        url: req.body.providedURL,
        proofOfWork: req.body.conversationWay
    }

    if (newCampaign.duration == 'recurring') {
        newCampaign.durationDetails = ''
    } 
    
    if (newCampaign.conversation == 'other'){
        newCampaign.variant = req.body.variant
    }

    if(newCampaign.duration == 'time') {
        newCampaign.durationDetails = req.body.selectedDate
    } else if (newCampaign.duration == 'budget'){
        newCampaign.durationDetails = req.body.fullBudget
    }

    if(newCampaign.convType == 'other') {
        newCampaign.convCustom = req.body.variant;
    }

    console.log('Final data:')
    console.log(newCampaign)

    await pool.query('INSERT INTO camp SET ?', [newCampaign], async (err, result, fields) => {
        if (err) {
            console.log(err)
            response = {
                'success': false,
                'message': 'Couldn\'t create campaign',
            };
        } else {
            response = {
                'success': true,
                'message': 'Campaign Created',
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


//get campaigns gets ALL THE CAMPAIGNS AVAILABLE FOR THE USER

const getCampaigns = async (req, res) => { //done

    // res.header("Access-Control-Allow-Origin", "*")

    let auth_token = req.body.auth_token

    console.log('Check------------------')
    console.log(auth_token)
    
    //stores the campaigns that the user havent done
    let allCampaigns = [],
    //stores the ca
    userDone = [],ar = []

    //check if the user exists
    await pool.query('SELECT * FROM users WHERE auth_token=?', [auth_token], async (err, user, fields) => {

        if (err) {
            console.error(err)
            response = {
                'success': false,
                'message': 'Error'
            }

            console.log(user)

            res.status(200).json(response)
            return;
        }
        
        await pool.query('SELECT * FROM user_campaign WHERE user_id=?', [user[0].id], async (error, user_campaigns) => {
            if (error) {
                console.error(error)

                response = {
                    'success': false,
                    'message': 'Error'
                }
                res.status(200).json(response)
            }
            user_campaigns.forEach(one =>{
                userDone.push(one.campaign_id)
            })
    
            await pool.query('SELECT * from campaigns', async (er, all_campaigns, fields) => {
                if (all_campaigns.length!=0) {

                    console.log(user_campaigns != null)

                    if (user_campaigns != null) {
                            all_campaigns.forEach(campaign => { 
                                ar.push(campaign)
                            });
                        console.log(ar)
                        res.status(200).json(ar)

                    } else {
                        res.status(200).json([])
                    }
                }
            })
        })
        res.status(200).json(allCampaigns)
    })
}



const completeCampaign = async (req, res)=>{
    let user_id = req.body.user_id;
    let campaign_id = req.body.campaign_id;
    console.log(user_id, campaign_id)

    let newCampaign = {
        user_id:user_id,
        campaign_id: campaign_id
    } , response

    await pool.query('INSERT INTO user_campaign SET ?', [newCampaign], async (error) => {
        if (error) {
            response = {
                'success': false,
                'message': 'Couldn\'t complete campaign',
            };
        } else {
            response = {
                'success': true,
                'message': 'Campaign Completed',
            };
        }

        await pool.query('SELECT * FROM campaigns WHERE id=?', [campaign_id], async (err, result, fields) => {
            
            if (!err && result) {
                result[0].completed = true;
                await pool.query('UPDATE campaigns SET ? WHERE id=?', [result[0], campaign_id])
                
                console.log(response)
                res.status(200).json(response);
            }
        })
    })
}


const campaignProgress = async (req, res) => {
    let auth_token = req.body.auth_token;  
    await pool.query('SELECT * FROM users WHERE auth_token=?', [auth_token], async (err, userData, fields) => {
        await pool.query('SELECT * FROM user_campaign WHERE user_id=?', [userData[0].id], async (err, userCampaigns) => {
            await pool.query('SELECT * FROM campaigns WHERE 1', async (err, allCampaigns) => {

                console.log(allCampaigns)
                console.log(userCampaigns)
                res.status(200).json({
                    'success': true,
                    'completed': userCampaigns.length,
                    'remaining': allCampaigns.length - userCampaigns.length

                })
            })
        })
    })
}

module.exports = {
    getCampaigns,
    completeCampaign,
    campaignProgress,
    createCampaign
}