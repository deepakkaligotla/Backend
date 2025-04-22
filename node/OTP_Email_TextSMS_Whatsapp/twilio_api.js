require('dotenv').config();
const express = require('express')
const Twilio = require("twilio")
const utils = require('./utils')

const router = express.Router()

router.post('/send_otp_using_twilio', (req, res) => {
  const twilio = new Twilio("ACf5b01a7816eb33397ab525841387f706", process.env.TWILIO_AUTH_TOKEN);
  twilio.messages.create({
    body: 'Message from Twilio',
    to: '+919381640235',
    from: '+12059460372',
  })
  .then((message) => {
    console.log(message)
    res.status(200).send(utils.createSuccessResult(message));
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send(utils.createErrorResult(error));
  });
})

module.exports = router