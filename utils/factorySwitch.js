module.exports = async (event, Model) => {
  switch (event.field) {
    case "getOne":
      return await Model.findById(event.arguments.id);
    case "getAll":
      return await Model.find();
    case "createOne":
      return await Model.create(event.arguments);
    case "updateOne":
      return await Model.findByIdAndUpdate(
        event.arguments.id,
        event.arguments,
        {
          new: true,
          runValidators: true,
        }
      );
    case "deleteOne":
      return await Model.findByIdAndDelete(event.arguments.id);
    default:
      return null;
  }
};
