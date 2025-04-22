const nodemailer = require('nodemailer')
const path = require('path');

function sendEmailWithAttachments(emails, subject, body, attachments, callback) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: 'deepak.kaligotla@gmail.com',
      pass: 'wxuymikrucfdfrxy', 
    },
  })

  console.log(attachments)

  const mailOptions = {
    from: 'Deepak Kaligotla <deepak@kaligotla.in>',
    to: emails.to,
    cc: emails.cc,
    bcc: emails.bcc,
    subject: subject,
    text: 'For clients with plaintext support only',
    html: body,
    attachments: attachments.map(attachment => ({
      filename: path.basename(attachment),
      path: attachment,
    })),
  }

  transporter.sendMail(mailOptions, function (error, info) {
    callback(error, info)
  })
}

function sendEmail(emails, subject, body, callback) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: 'deepak.kaligotla@gmail.com',
      pass: 'wxuymikrucfdfrxy',
    },
  })

  const mailOptions = {
    from: 'Deepak Kaligotla <deepak@kaligotla.in>',
    to: emails.to,
    cc: emails.cc,
    bcc: emails.bcc,
    subject: subject,
    text: 'For clients with plaintext support only',
    html: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    callback(error, info)
  })
}

module.exports = {
  sendEmail: sendEmail,
  sendEmailWithAttachments: sendEmailWithAttachments,
}
