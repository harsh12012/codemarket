const Test = require("./utils/testModel");
const Listing = require("../listing_lambda/utils/listingModel");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const DB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vivekt:codemarketc@codemarket-staging.k16z7.mongodb.net/parkyourself?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
    console.log("DB Connection Successfull!");
  } catch (error) {
    console.log("DB Connection Failed");
  }
};
DB();
// console.log(
//   "3:00pm 1604914200000",
//   new Date("2020-11-09T09:30:00.000Z").toLocaleTimeString(),
//   Date.parse("2020-11-09T09:30:00.000Z")
// );
// console.log(
//   "4:00pm 1604917800000",
//   new Date("2020-11-09T10:30:00.000Z").toLocaleTimeString(),
//   Date.parse("2020-11-09T10:30:00.000Z")
// );
// console.log(
//   "5:00pm 1604921400000",
//   new Date("2020-11-09T11:30:00.000Z").toLocaleTimeString(),
//   Date.parse("2020-11-09T11:30:00.000Z")
// );
// console.log(
//   "6:00pm 1604925000000",
//   new Date("2020-11-09T12:30:00.000Z").toLocaleTimeString(),
//   Date.parse("2020-11-09T12:30:00.000Z")
// );
// console.log(
//   "7:00pm 1604928600000",
//   new Date("2020-11-09T13:30:00.000Z").toLocaleTimeString(),
//   Date.parse("2020-11-09T13:30:00.000Z")
// );

const startt = 1604914200000;
const endd = 1604917800000;

const getAllBookings = async () => {
  const bookings = await Test.find({
    // listingId: "2",
    $or: [
      {
        $and: [{ startDate: { $lte: startt } }, { endDate: { $gt: startt } }],
      },
      {
        $and: [{ startDate: { $lt: endd } }, { endDate: { $gte: endd } }],
      },
    ],
  });
  console.log(bookings);
};

const getAllBookingsID = async () => {
  const bookings = await Test.find({
    listingId: "5fa8e212343e8b00081c1ad2",
  });
  console.log(bookings);
};

const createBookings = async () => {
  data = {
    listingId: "5fa8e212343e8b00081c1ad2",
    start: 33,
    startDate: 1604914200000,
    end: 44,
    endDate: 1604917800000,
  };
  const bookings = await Test.create(data);
  console.log(bookings);
};

const getListings = async () => {
  const lng = 73.13643569999999;
  const lat = 18.5446161;

  const starttt = 1604921400000;
  const enddd = 1604928600000;

  const listings = await Listing.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng, lat],
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "distance",
      },
    },
    { $match: { published: true } },
    {
      $lookup: {
        from: "tests",
        as: "bookingCount",
        let: {
          listingId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  {
                    $and: [
                      { $eq: ["$listingId", "$$listingId"] },
                      { $lte: ["$startDate", starttt] },
                      { $gt: ["$endDate", starttt] },
                    ],
                  },
                  {
                    $and: [
                      { $eq: ["$listingId", "$$listingId"] },
                      { $lt: ["$startDate", enddd] },
                      { $gte: ["$endDate", enddd] },
                    ],
                  },
                ],
              },
            },
          },
          {
            $count: "total",
          },
        ],
      },
    },
  ]);
  console.log("listings = = ", listings[0].bookingCount);
};

// createBookings();
// getAllBookings();
// getAllBookingsID();
// getListings();

const simple = "[{total=2}]";
const simple2 = simple.replace("=", ":");

console.log("simple", JSON.stringify(simple2));

// const starttt = new Date("2020-11-09T09:30:00.000Z");
// const enddd = new Date("2020-11-09T10:30:00.000Z");

// console.log("startt ", starttt);
// console.log("endd  ", enddd);

// node lambda-functions/test_lambda/index.js

// old;
// const listings = await Listing.aggregate([
//   {
//     $geoNear: {
//       near: {
//         type: "Point",
//         coordinates: [lng, lat],
//       },
//       maxDistance: 100000,
//       spherical: true,
//       distanceField: "location",
//     },
//   },
//   { $match: { published: true } },
//   {
//     $lookup: {
//       from: "tests",
//       let: { listingId: "$_id" },
//       pipeline: [
//         {
//           $match: {
//             // listingId: "$$listingId",
//             // $expr: {
//             //   $or: [
//             //     {
//             //       $and: [
//             //         { $eq: ["$listingId", "$$listingId"] },
//             //         // { $lte: ["$start", 1] },
//             //         // { $gt: ["$end", 6] },
//             //         // { $lte: ["$startDate", "2020-11-09T09:30:00.000Z"] },
//             //         {
//             //           $gt: [
//             //             "$endDate",
//             //             Date.parse("2020-11-09T12:30:00.000Z"),
//             //           ],
//             //         },
//             //       ],
//             //     },
//             //     // {
//             //     //   $and: [
//             //     //     { $eq: ["$listingId", "$$listingId"] },
//             //     //     { $lt: ["$start", 2] },
//             //     //     { $gte: ["$end", 2] },
//             //     //     // { $lt: ["$startDate", "2020-11-09T14:45:00.000+00:00"] },
//             //     //     // { $gte: ["$endDate", "2020-11-09T14:45:00.000+00:00"] },
//             //     //   ],
//             //     // },
//             //   ],
//             // },
//           },
//         },
//         // {
//         //   $count: "total",
//         // },
//       ],
//       as: "bookingCount",
//     },
//   },
// ]);
