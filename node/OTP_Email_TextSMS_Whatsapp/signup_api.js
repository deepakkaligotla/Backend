require('dotenv').config();
const express = require('express');
const whatsappService = require('./whatsapp_api_service');
const nexmoService = require('./nexmo_api_service');
const utils = require('./utils');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, mobile, otp } = req.body;
    console.log(req.body)
    try {
        const whatsappResponse = await whatsappService.sendMessageToWhatsApp(name, mobile, otp);
        const nexmoResponse = await nexmoService.sendSmsUsingNexmo(name, mobile, otp);

        res.status(200).send({
            whatsapp: utils.createSuccessResult(whatsappResponse.data),
            nexmo: utils.createSuccessResult(nexmoResponse)
        });
    } catch (error) {
        res.status(500).send(utils.createErrorResult(error));
    }
});

module.exports = router;