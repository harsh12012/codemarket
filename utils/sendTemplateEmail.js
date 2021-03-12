const AWS = require('aws-sdk');

AWS.config.accessKeyId = process.env.AWS_ACCESS_D;
AWS.config.secretAccessKey = process.env.AWS_SECRET_D;
AWS.config.region = process.env.REGION;

exports.sendTemplateEmail = (data) => {
  const params = {
    Template: data.templateName,
    Destination: {
      ToAddresses: data.emails,
    },
    Source: process.env.SENDER_EMAIL,
    TemplateData: JSON.stringify(data || {}),
  };
  return (sendPromise = new AWS.SES().sendTemplatedEmail(params).promise());
};
