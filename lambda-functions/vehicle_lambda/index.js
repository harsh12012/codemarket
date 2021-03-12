const DB = require('../../utils/DB');
const Vehicle = require('./utils/vehicleModel');
DB();

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case 'getVehicle':
        return await Vehicle.findById(event.arguments.id);
      case 'getUserVehicles':
        return await Vehicle.find({ userId: event.arguments.userId }).exec();
      case 'createVehicle':
        return await Vehicle.create(event.arguments);
      case 'updateVehicle':
        return await Vehicle.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case 'deleteVehicle':
        return await Vehicle.findByIdAndDelete(event.arguments.id);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
