const DB = require('../../utils/DB');
const Listing = require('./utils/listingModel');
const User = require('../user_lambda/utils/userModel');
DB();

exports.handler = async (event) => {
  try {
    let tempFilter = {};
    let tempFilterArray = [{}];
    let startDate = null;
    let endDate = null;
    let listing = null;
    let user = null;
    switch (event.type) {
      case 'getListing':
        return await Listing.findById(event.arguments.id);
      case 'getAllListingsSearch':
        const {
          page = 1,
          limit = 10,
          search = '',
          username = null,
          active = null,
        } = event.arguments;

        if (username !== null) {
          tempFilterArray = [
            { ownerId: username },
            { 'staff.staffId': username },
          ];
        }

        if (active !== null) {
          tempFilter.published = active;
        }

        const listings = await Listing.find({
          ...tempFilter,
          $and: [
            {
              $or: [...tempFilterArray],
            },
            {
              $or: [
                {
                  'locationDetails.address': { $regex: search, $options: 'i' },
                },
                {
                  ownerName: { $regex: search, $options: 'i' },
                },
                {
                  ownerEmail: { $regex: search, $options: 'i' },
                },
              ],
            },
          ],
        })
          .limit(limit * 1)
          .skip((page - 1) * limit);

        const listingsCount = await Listing.countDocuments({
          ...tempFilter,
          $and: [
            {
              $or: [...tempFilterArray],
            },
            {
              $or: [
                {
                  'locationDetails.address': { $regex: search, $options: 'i' },
                },
                {
                  ownerName: { $regex: search, $options: 'i' },
                },
                {
                  ownerEmail: { $regex: search, $options: 'i' },
                },
              ],
            },
          ],
        });
        return {
          listings: listings,
          count: listingsCount,
        };
      case 'getPublishedListings':
        return await Listing.find({ published: true }).exec();
      case 'getListingsWithBookings':
        const diff =
          Date.parse(event.arguments.end) - Date.parse(event.arguments.start);
        const diffFromNow =
          Date.parse(event.arguments.start) - Date.parse(new Date());
        const {
          startDay,
          startHour,
          startMinute,
          endDay,
          endHour,
          endMinute,
        } = event.arguments;
        startDate = new Date(event.arguments.start);
        endDate = new Date(event.arguments.end);
        const isStartDayMonday = startDay === 1 ? true : 'null';
        const isEndDayMonday = endDay === 1 ? true : 'null';
        const isStartDayTuesday = startDay === 2 ? true : 'null';
        const isEndDayTuesday = endDay === 2 ? true : 'null';
        const isStartDayWednesday = startDay === 3 ? true : 'null';
        const isEndDayWednesday = endDay === 3 ? true : 'null';
        const isStartDayThursday = startDay === 4 ? true : 'null';
        const isEndDayThursday = endDay === 4 ? true : 'null';
        const isStartDayFriday = startDay === 5 ? true : 'null';
        const isEndDayFriday = endDay === 5 ? true : 'null';
        const isStartDaySaturday = startDay === 6 ? true : 'null';
        const isEndDaySaturday = endDay === 6 ? true : 'null';
        const isStartDaySunday = startDay === 0 ? true : 'null';
        const isEndDaySunday = endDay === 0 ? true : 'null';

        return await Listing.aggregate([
          {
            $geoNear: {
              near: {
                type: 'Point',
                coordinates: [event.arguments.lng, event.arguments.lat],
              },
              maxDistance: 100000,
              spherical: true,
              distanceField: 'distance',
            },
          },
          {
            $match: {
              published: true,
              'spaceAvailable.minTime.value': { $lte: diff },
              'spaceAvailable.maxTime.value': { $gte: diff },
              'spaceAvailable.advanceBookingTime.value': { $gte: diffFromNow },
              $and: [
                {
                  $or: [
                    { 'spaceAvailable.hasNoticeTime': false },
                    {
                      'spaceAvailable.noticeTime.value': { $lte: diffFromNow },
                    },
                  ],
                },
                {
                  $or: [
                    {
                      'spaceAvailable.scheduleType': '24hours',
                    },
                    {
                      $and: [
                        {
                          'spaceAvailable.scheduleType': 'fixed',
                        },
                        {
                          $or: [
                            {
                              $and: [
                                {
                                  'spaceAvailable.monday.isActive': isStartDayMonday,
                                  $or: [
                                    {
                                      'spaceAvailable.monday.startHour': {
                                        $lt: startHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.monday.startHour': startHour,
                                        },
                                        {
                                          'spaceAvailable.monday.startMinute': {
                                            $lte: startMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  'spaceAvailable.monday.isActive': isEndDayMonday,
                                  $or: [
                                    {
                                      'spaceAvailable.monday.endHour': {
                                        $gt: endHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.monday.endHour': endHour,
                                        },
                                        {
                                          'spaceAvailable.monday.endMinute': {
                                            $gte: endMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              $and: [
                                {
                                  'spaceAvailable.tuesday.isActive': isStartDayTuesday,
                                  $or: [
                                    {
                                      'spaceAvailable.tuesday.startHour': {
                                        $lt: startHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.tuesday.startHour': startHour,
                                        },
                                        {
                                          'spaceAvailable.tuesday.startMinute': {
                                            $lte: startMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  'spaceAvailable.tuesday.isActive': isEndDayTuesday,
                                  $or: [
                                    {
                                      'spaceAvailable.tuesday.endHour': {
                                        $gt: endHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.tuesday.endHour': endHour,
                                        },
                                        {
                                          'spaceAvailable.tuesday.endMinute': {
                                            $gte: endMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },

                            {
                              $and: [
                                {
                                  'spaceAvailable.wednesday.isActive': isStartDayWednesday,
                                  $or: [
                                    {
                                      'spaceAvailable.wednesday.startHour': {
                                        $lt: startHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.wednesday.startHour': startHour,
                                        },
                                        {
                                          'spaceAvailable.wednesday.startMinute': {
                                            $lte: startMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  'spaceAvailable.wednesday.isActive': isEndDayWednesday,
                                  $or: [
                                    {
                                      'spaceAvailable.wednesday.endHour': {
                                        $gt: endHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.wednesday.endHour': endHour,
                                        },
                                        {
                                          'spaceAvailable.wednesday.endMinute': {
                                            $gte: endMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              $and: [
                                {
                                  'spaceAvailable.thursday.isActive': isStartDayThursday,
                                  $or: [
                                    {
                                      'spaceAvailable.thursday.startHour': {
                                        $lt: startHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.thursday.startHour': startHour,
                                        },
                                        {
                                          'spaceAvailable.thursday.startMinute': {
                                            $lte: startMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  'spaceAvailable.thursday.isActive': isEndDayThursday,
                                  $or: [
                                    {
                                      'spaceAvailable.thursday.endHour': {
                                        $gt: endHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.thursday.endHour': endHour,
                                        },
                                        {
                                          'spaceAvailable.thursday.endMinute': {
                                            $gte: endMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              $and: [
                                {
                                  'spaceAvailable.friday.isActive': isStartDayFriday,
                                  $or: [
                                    {
                                      'spaceAvailable.friday.startHour': {
                                        $lt: startHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.friday.startHour': startHour,
                                        },
                                        {
                                          'spaceAvailable.friday.startMinute': {
                                            $lte: startMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  'spaceAvailable.friday.isActive': isEndDayFriday,
                                  $or: [
                                    {
                                      'spaceAvailable.friday.endHour': {
                                        $gt: endHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.friday.endHour': endHour,
                                        },
                                        {
                                          'spaceAvailable.friday.endMinute': {
                                            $gte: endMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              $and: [
                                {
                                  'spaceAvailable.saturday.isActive': isStartDaySaturday,
                                  $or: [
                                    {
                                      'spaceAvailable.saturday.startHour': {
                                        $lt: startHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.saturday.startHour': startHour,
                                        },
                                        {
                                          'spaceAvailable.saturday.startMinute': {
                                            $lte: startMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  'spaceAvailable.saturday.isActive': isEndDaySaturday,
                                  $or: [
                                    {
                                      'spaceAvailable.saturday.endHour': {
                                        $gt: endHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.saturday.endHour': endHour,
                                        },
                                        {
                                          'spaceAvailable.saturday.endMinute': {
                                            $gte: endMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              $and: [
                                {
                                  'spaceAvailable.sunday.isActive': isStartDaySunday,
                                  $or: [
                                    {
                                      'spaceAvailable.sunday.startHour': {
                                        $lt: startHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.sunday.startHour': startHour,
                                        },
                                        {
                                          'spaceAvailable.sunday.startMinute': {
                                            $lte: startMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  'spaceAvailable.sunday.isActive': isEndDaySunday,
                                  $or: [
                                    {
                                      'spaceAvailable.sunday.endHour': {
                                        $gt: endHour,
                                      },
                                    },
                                    {
                                      $and: [
                                        {
                                          'spaceAvailable.sunday.endHour': endHour,
                                        },
                                        {
                                          'spaceAvailable.sunday.endMinute': {
                                            $gte: endMinute,
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $and: [
                        {
                          'spaceAvailable.scheduleType': 'custom',
                        },
                        {
                          'spaceAvailable.customTimeRange.startDate': {
                            $lte: startDate,
                          },
                        },
                        {
                          'spaceAvailable.customTimeRange.endDate': {
                            $gte: endDate,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
          {
            $lookup: {
              from: 'bookings',
              as: 'bookingCount',
              let: {
                listingId: '$_id',
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $or: [
                        {
                          $and: [
                            { $eq: ['$listingId', '$$listingId'] },
                            {
                              $lte: [
                                '$startDate',
                                Date.parse(event.arguments.start),
                              ],
                            },
                            {
                              $gt: [
                                '$endDate',
                                Date.parse(event.arguments.start),
                              ],
                            },
                          ],
                        },
                        {
                          $and: [
                            { $eq: ['$listingId', '$$listingId'] },
                            {
                              $lt: [
                                '$startDate',
                                Date.parse(event.arguments.end),
                              ],
                            },
                            {
                              $gte: [
                                '$endDate',
                                Date.parse(event.arguments.end),
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
                {
                  $count: 'total',
                },
              ],
            },
          },
        ]);
      case 'getPublishedListingsWithLatLng':
        return await Listing.find({
          published: true,
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [event.arguments.lng, event.arguments.lat],
              },
              $maxDistance: 100000,
            },
          },
        }).exec();
      case 'getOwnerListings':
        return await Listing.find({ ownerId: event.arguments.ownerId }).exec();
      case 'createListing':
        listing = await Listing.create(event.arguments);
        User.findOneAndUpdate(
          { username: event.arguments.ownerId },
          { $inc: { listings: 1 } }
        );
        return listing;
      case 'updateListing':
        return await Listing.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case 'deleteListing':
        let deletedListing = await Listing.findByIdAndDelete(
          event.arguments.id
        );
        User.findOneAndUpdate(
          { username: event.arguments.ownerId },
          { $inc: { listings: -1 } }
        );
        return deletedListing;
      case 'getStaff':
        return (
          await Listing.findById(event.arguments.listingId).populate({
            path: 'staff.user',
            // model: 'User',
          })
        ).staff;
      case 'addStaff':
        listing = await Listing.findById(event.arguments.listingId);
        user = await User.findOne({
          username: event.arguments.staffId,
          active: true,
        });
        // if(listing.ownerId === event.arguments.staffId)
        // dont allow owner to add him self throw new Error('Owner can't add him self')
        listing.staff.push({
          staffId: event.arguments.staffId,
          role: event.arguments.role,
          user: user._id,
        });
        await listing.save();
        newStaff = listing.staff.filter(
          (s) => s.staffId === event.arguments.staffId
        )[0];
        newStaff.user = user;
        return newStaff;
      case 'updateStaffRole':
        listing = await Listing.findById(event.arguments.listingId);
        listing.staff.id(event.arguments.id).role = event.arguments.role;
        if (event.arguments.createdAt) {
          listing.staff.id(event.arguments.id).createdAt =
            event.arguments.createdAt;
        }
        await listing.save();
        return event.arguments.role;
      case 'removeStaff':
        listing = await Listing.findById(event.arguments.listingId);
        listing.staff.id(event.arguments.id).remove();
        await listing.save();
        return true;
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
