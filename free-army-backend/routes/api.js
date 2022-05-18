const ApiController = require('../controllers/ApiController.js')
const CampaignController = require('../controllers/CampaignController.js')
const InviteController = require('../controllers/InviteController.js')
const UploadAvatar = require('../controllers/UploadAvatar.js')
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

const express = require('express')
const router = express.Router()


router.post('/login', urlencodedParser, ApiController.login);
router.post('/signup', urlencodedParser, ApiController.signup);
router.post('/change_password', urlencodedParser, ApiController.changePassword);
router.post('/verify_account', urlencodedParser, ApiController.verifyAccount);
router.post ('/send_reset_email', urlencodedParser, ApiController.recoverAccount);
router.post ('/reset_password', urlencodedParser, ApiController.reset_password);
router.post('/update_settings', urlencodedParser, ApiController.updateSettings);

router.post('/get_campaigns', urlencodedParser, CampaignController.getCampaigns);
router.post('/complete_campaign', urlencodedParser, CampaignController.completeCampaign);
router.post('/campaign_progress', urlencodedParser, CampaignController.campaignProgress);
router.post('/create_campaign', urlencodedParser, CampaignController.createCampaign);


router.post('/invite_friend', urlencodedParser, InviteController.inviteFriend);
router.post('/get_referrals', urlencodedParser, InviteController.getReferrals);

router.post('/change_image', urlencodedParser, UploadAvatar.avatar);

router.get('/upload_avatar', urlencodedParser,(req,res)=>{
    res.render('index')
});


module.exports = router
