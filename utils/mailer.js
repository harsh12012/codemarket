const AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

const html = (message) => {
  return `<div>${message}</div>`;
};

exports.mailer = (data) => {
  const params = {
    Destination: {
      ToAddresses: data.emails,
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: data.subject,
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: html(data.message),
        },
      },
    },
    Source: data.source || process.env.SENDER_EMAIL,
  };
  return (sendPromise = new AWS.SES().sendEmail(params).promise());
};
