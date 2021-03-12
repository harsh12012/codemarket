const DB = require("../../utils/DB");
const ImageSlider = require("./utils/imageSliderModel");
DB();

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case "getOneImageSlider":
        return await ImageSlider.findById(event.arguments.id);
      case "getOneImageSliderBySlug":
        return await ImageSlider.findOne({
          $or: [
            { slug: event.arguments.slug, published: true },
            { slug: event.arguments.slug, userId: event.arguments.userId },
          ],
        });
      case "getAllImageSliders":
        return await ImageSlider.find();
      case "createOneImageSlider":
        return await ImageSlider.create(event.arguments);
      case "updateOneImageSlider":
        return await ImageSlider.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case "deleteOneImageSlider":
        return await ImageSlider.findByIdAndDelete(event.arguments.id);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
