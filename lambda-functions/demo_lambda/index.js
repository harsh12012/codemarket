const mongoose = require('mongoose');
const DB = require('../../utils/DB');
const Demo = require('./utils/demoModel');
DB();

exports.handler = async (event) => {
  try {
    let tempDemo = null;
    let filter = { status: 'open' };
    let tempFilter = null;
    switch (event.type) {
      case 'getAllDemos':
        if (tempFilter.status) filter.status = tempFilter.status;
        if (tempFilter.ref) filter.ref = event.arguments.ref;
        // if (event.arguments.filter) {
        //   tempFilter = JSON.parse(event.arguments.filter);
        //   if (tempFilter.status) filter.status = tempFilter.status;
        //   if (tempFilter.ref) filter.ref = event.arguments.ref;
        // }
        return await Demo.find(filter);
      case 'getOneDemo':
        return await Demo.findById(event.arguments.id);
      case 'createOneDemo':
        return await Demo.create(event.arguments);
      case 'updateOneDemo':
        tempDemo = await Demo.findById(event.arguments.id);
        tempDemo._id = mongoose.Types.ObjectId();
        tempDemo.ref = mongoose.Types.ObjectId(event.arguments.id);
        tempDemo.status = 'close';
        tempDemo.isNew = true;
        tempDemo.save();
        return await Demo.findByIdAndUpdate(
          event.arguments.id,
          { ...event.arguments, updatedAt: new Date() },
          {
            new: true,
            runValidators: true,
          }
        );
      case 'deleteOneDemo':
        tempDemo = await Demo.findById(event.arguments.id);
        tempDemo._id = mongoose.Types.ObjectId();
        tempDemo.ref = mongoose.Types.ObjectId(event.arguments.id);
        tempDemo.status = 'close';
        tempDemo.isNew = true;
        tempDemo.save();
        await Demo.findByIdAndUpdate(
          event.arguments.id,
          {
            updatedBy: event.arguments.updatedBy,
            status: 'close',
            updatedAt: new Date(),
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return true;
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
