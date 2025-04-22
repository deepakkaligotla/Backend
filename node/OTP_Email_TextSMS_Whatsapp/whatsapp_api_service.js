const axios = require('axios');

const apiUrl = 'https://graph.facebook.com/v18.0/178208732051615/messages';
const accessToken = process.env.WHATSAPP_AUTH_BEARER_TOKEN;

const sendMessageToWhatsApp = (name, mobile, otp) => {
    const requestBody = {
        "messaging_product": "whatsapp",
        "to": mobile,
        "type": "template",
        "template": {
            "name": "otp_template",
            "language": {
                "code": "en"
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": name
                        },
                        {
                            "type": "text",
                            "text": otp
                        }
                    ]
                }
            ]
        }
    };

    return axios.post(apiUrl, requestBody, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
};

module.exports = {
    sendMessageToWhatsApp
};