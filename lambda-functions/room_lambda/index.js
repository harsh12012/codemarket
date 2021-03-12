const DB = require("../../utils/DB");
const Room = require("./utils/roomModel");
DB();

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case "getOneRoom":
        return await Room.findById(event.arguments.id);
      case "getOneRoomBySlug":
        return await Room.findOne({
          $or: [
            { slug: event.arguments.slug, published: true },
            { slug: event.arguments.slug, userId: event.arguments.userId },
          ],
        });
      case "getAllRooms":
        return await Room.find();
      case "createOneRoom":
        return await Room.create(event.arguments);
      case "updateOneRoom":
        return await Room.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case "deleteOneRoom":
        return await Room.findByIdAndDelete(event.arguments.id);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
