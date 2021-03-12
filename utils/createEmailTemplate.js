const AWS = require('aws-sdk');

AWS.config.accessKeyId = process.env.AWS_ACCESS_D;
AWS.config.secretAccessKey = process.env.AWS_SECRET_D;
AWS.config.region = process.env.REGION;

exports.createTemplate = (data) => {
  var params = {
    Template: {
      TemplateName: data.templateName,
      HtmlPart: data.body,
      SubjectPart: data.subject,
    },
  };
  return (sendPromise = new AWS.SES().createTemplate(params).promise());
};
