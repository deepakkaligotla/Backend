const express = require('express')
const multer = require('multer')
const utils = require('./utils')
const mailer = require('./goDaddy_config')
const path = require('path');
const axios = require('axios');

const router = express.Router()

var toEmails;
var ccEmails;
var bccEmails;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'attachments/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.originalname}-${uniqueSuffix}`);
  },
});

const upload = multer({ storage: storage });

router.post('/send_email_from_godaddy', (req, res) => {
  console.log(req.body)

  if (req.body.to) {
    toEmails = req.body.to.split(',').map(email => email.trim());
  }

  if (req.body.cc) {
    ccEmails = req.body.cc.split(',').map(email => email.trim());
  }
  
  if (req.body.bcc) {
    bccEmails = req.body.bcc.split(',').map(email => email.trim());
  }

  const emailData = {
    to: toEmails,
    cc: ccEmails,
    bcc: bccEmails,
  };

  mailer.sendEmail(emailData, 'Simple Email', req.body.emailBody, (error, info) => {
    res.send(utils.createResult(error, info))
  })
})

router.post('/send_email_with_attachments_from_godaddy', upload.array('attachments', 10), async (req, res) => {
  console.log(req.body);

  if (req.body.to) {
    toEmails = req.body.to.split(',').map(email => email.trim());
  }

  if (req.body.cc) {
    ccEmails = req.body.cc.split(',').map(email => email.trim());
  }

  if (req.body.bcc) {
    bccEmails = req.body.bcc.split(',').map(email => email.trim());
  }

  if (!req.files && !req.body.filepath) {
    return res.status(400).send('No valid file uploaded or provided as a URL.');
  }

  let attachmentPaths = [];

  if (req.files) {
    for (const file of req.files) {
      attachmentPaths.push(file.path);
    }
  }

  if (req.body.filepath) {
    try {
      const response = await axios.head(req.body.filepath);
      if (response.status === 200) {
        const fileName = path.basename(req.body.filepath);
        const destPath = `attachments/${Date.now()}_${fileName}`;
        attachmentPaths.push(destPath);
        await axios({ url: req.body.filepath, responseType: 'stream' })
          .then(response => response.data.pipe(require('fs').createWriteStream(destPath)));
      }
    } catch (error) {
      console.error('Error downloading file from URL:', error.message);
    }
  }

  if (attachmentPaths.length === 0) {
    return res.status(400).send('No valid file uploaded or provided as a URL.');
  }

  const emailData = {
    to: toEmails,
    cc: ccEmails,
    bcc: bccEmails,
  };

  mailer.sendEmailWithAttachments(emailData, 'Email with Attached', req.body.emailBody, attachmentPaths, (error, info) => {
    res.send(utils.createResult(error, info));
  }
  );
});

module.exports = router