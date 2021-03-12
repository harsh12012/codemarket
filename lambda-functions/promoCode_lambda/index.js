const DB = require("../../utils/DB");
const PromoCode = require("./utils/promoCodeModel");
DB();

exports.handler = async (event) => {
  try {
    switch (event.type) {
      case "getPromoCode":
        return await PromoCode.findById(event.arguments.id);
      case "getPromoCodesByListingId":
        return await PromoCode.find({
          listingId: event.arguments.listingId,
        }).exec();
      case "createPromoCode":
        return await PromoCode.create(event.arguments);
      case "updatePromoCode":
        return await PromoCode.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case "deletePromoCode":
        return await PromoCode.findByIdAndDelete(event.arguments.id);
      case "checkPromoCode":
        const currentDate = new Date();
        const promoCode = await PromoCode.find({
          code: event.arguments.code,
          listingId: event.arguments.listingId,
        });
        let promoCodeData = {
          isValid: false,
          discount: 0,
          id: "",
        };
        if (promoCode.length > 0) {
          if (
            currentDate.getTime() >= promoCode[0].startDate.getTime() &&
            currentDate.getTime() <= promoCode[0].endDate.getTime() &&
            promoCode[0].remaining >= 1
          ) {
            promoCodeData.isValid = true;
            promoCodeData.discount = promoCode[0].discount;
            promoCodeData.id = promoCode[0]["_id"];
          }
        }
        return promoCodeData;

      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
