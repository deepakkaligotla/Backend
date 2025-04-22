const Nexmo = require('nexmo');

const nexmo = new Nexmo({ apiKey: process.env.NEXMO_API_KEY, apiSecret: process.env.NEXMO_API_SECRET });

const sendSmsUsingNexmo = (name, mobile, otp) => {
    message=`Hello ${name}, use ${otp} for Login. Please enter this within 2 minutes and do not share OTP with anyone. Thanks Deepak Kaligotla`

    return new Promise((resolve, reject) => {
        nexmo.message.sendSms('+919381640235', mobile, message, (err, result) => {
            if (err) {
                reject(err);
            }
            if (result) {
                resolve(result);
            }
        });
    });
};

module.exports = {
    sendSmsUsingNexmo
};