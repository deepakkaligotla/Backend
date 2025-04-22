const nodemailer = require('nodemailer')
const path = require('path');

function sendEmailWithAttachments(emails, subject, body, attachments, callback) {
  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    secure: true,
    port: 465,
    auth: {
      user: 'deepak@kaligotla.in',
      pass: '$U$hm@214326',
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
      filename: attachment.filename,
      path: attachment.path,
    })),
  }

  transporter.sendMail(mailOptions, function (error, info) {
    callback(error, info)
  })
}

function sendEmail(emails, subject, body, callback) {
  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    secure: true,
    port: 465,
    auth: {
      user: 'deepak@kaligotla.in',
      pass: '$U$hm@214326',
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
  }

  transporter.sendMail(mailOptions, function (error, info) {
    callback(error, info)
  })
}

module.exports = {
  sendEmail: sendEmail,
  sendEmailWithAttachments: sendEmailWithAttachments,
}
