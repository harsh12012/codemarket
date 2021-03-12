const DB = require("../../utils/DB");
const Form = require("./utils/formModel");
const FormSub = require("./utils/formSubModel");
DB();

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case "getOneForm":
        return await Form.findById(event.arguments.id);
      case "getOneFormBySlug":
        return await Form.findOne({
          $or: [
            { slug: event.arguments.slug, published: true },
            { slug: event.arguments.slug, userId: event.arguments.userId },
          ],
        });
      case "getAllForms":
        return await Form.find();
      case "createOneForm":
        return await Form.create(event.arguments);
      case "updateOneForm":
        return await Form.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case "deleteOneForm":
        return await Form.findByIdAndDelete(event.arguments.id);
      case "getOneFormSub":
        return await FormSub.findById(event.arguments.id);
      case "getAllFormSubs":
        return await FormSub.find();
      case "getAllFormSubsByFormId":
        return await FormSub.find({ formId: event.arguments.formId });
      case "createOneFormSub":
        return await FormSub.create(event.arguments);
      case "updateOneFormSub":
        return await FormSub.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case "deleteOneFormSub":
        return await FormSub.findByIdAndDelete(event.arguments.id);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
