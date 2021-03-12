const ObjectId = require('mongodb').ObjectID;
const DB = require('../../utils/DB');
const Policy = require('./utils/policyModel');
DB();

exports.handler = async (event) => {
  try {
    console.log(event)
    switch (event.type) {
      case 'getOnePolicy':
        return await Policy.findById(ObjectId(process.env.POLICY_ID));
      case 'createOnePolicy':
        return await Policy.create({
          ...event.arguments,
          details: event.arguments.details,
        });
      case 'updateOnePolicy':
        return await Policy.findByIdAndUpdate(

          ObjectId(process.env.POLICY_ID),
          {
            ...event.arguments,
            details: event.arguments.details,
            updatedAt: new Date(),
          },
          {
            new: true,
            runValidators: true,
          }
        );
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
