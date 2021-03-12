const DB = require("../../utils/DB");
const Email = require("../../models/emailModel");
const ScrapedEmail = require("../../models/scrapedEmailModel");
const TemplateEmail = require("../../models/templateEmailModel");
const { mailer } = require("../../utils/mailer");
const { createTemplate } = require("../../utils/createEmailTemplate");
const { sendTemplateEmail } = require("../../utils/sendTemplateEmail");
DB();

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case "sendEmail":
        const data = await Email.create(event.arguments);
        await mailer(data);
        return data;
      case "createEmailTemplate":
        await createTemplate(event.arguments);
        return "true";
      case "sendTemplateEmail":
        const vt = await TemplateEmail.create(event.arguments);
        await sendTemplateEmail(event.arguments);
        return vt;
      case "getAllEmails":
        return ScrapedEmail.find();
      case "createOneEmail":
        return ScrapedEmail.create(event.arguments);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
