const ObjectId = require('mongodb').ObjectID;
const DB = require('../../utils/DB');
const sendNotification = require('../../utils/notification');
const Booking = require('./utils/bookingModel');
const { setupTransfer } = require('./utils/cloudWatchEvent');
const { mailer } = require('../../utils/mailer');
const StripePayment = require('../payment_lambda/utils/stripePayment');
const User = require('../user_lambda/utils/userModel');
const Listing = require('../listing_lambda/utils/listingModel');
DB();

exports.handler = async (event) => {
  try {
    let updatedBooking = null;
    let tempFilter = {};
    let tempFilterArray = {};
    switch (event.type) {
      case 'getBooking':
        return await Booking.findById(ObjectId(event.arguments.id));
      case 'getAllBookings':
        return await Booking.find(
          event.arguments.filter ? JSON.parse(event.arguments.filter) : {}
        );
      case 'getAllBookingsSearch':
        // let oneYearFromNow = new Date();
        // oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        // let yearsBackFromNow = new Date();
        // yearsBackFromNow.setFullYear(yearsBackFromNow.getFullYear() - 100);
        const {
          page = 1,
          limit = 10,
          status,
          search = '',
          startDate = null,
          endDate = null,
          sortBy = 'startDate',
          driverId = null,
          ownerId = null,
          listingId = null,
          minAmount = null,
          maxAmount = null,
          minDuration = null,
          maxDuration = null,
        } = event.arguments;

        if (driverId !== null) {
          tempFilter.driverId = driverId;
        }

        if (ownerId !== null) {
          const res = await Listing.find({
            $or: [{ ownerId: ownerId }, { 'staff.staffId': ownerId }],
          }).select('_id');
          const listingIdArray = res.map((i) => i._id);
          tempFilter.listingId = { $in: listingIdArray };
          // tempFilter.ownerId = ownerId;
        }

        if (listingId !== null) {
          tempFilter.listingId = listingId;
        }

        if (
          status !== null &&
          (status === 'upcoming' || status === 'current')
        ) {
          await Booking.updateMany(
            {
              endDate: { $lt: Date.parse(new Date()) },
              status: status,
              ...tempFilter,
            },
            { $set: { status: 'completed' } }
          );
        }

        if (startDate !== null && endDate !== null) {
          tempFilter.startDate = {
            $gte: Date.parse(startDate),
          };
          tempFilter.endDate = {
            $lte: Date.parse(endDate),
          };
        }

        if (minAmount !== null && maxAmount !== null) {
          tempFilter.payment = { $gt: minAmount, $lt: maxAmount };
        }

        if (minDuration !== null && maxDuration !== null) {
          tempFilter.duration = { $gt: minDuration, $lt: maxDuration };
        }

        const bookings = await Booking.find({
          ...tempFilter,
          status: status,
          $or: [
            {
              address: { $regex: search, $options: 'i' },
            },
            {
              driverName: { $regex: search, $options: 'i' },
            },
            {
              driverEmail: { $regex: search, $options: 'i' },
            },
            {
              ownerName: { $regex: search, $options: 'i' },
            },
            {
              ownerEmail: { $regex: search, $options: 'i' },
            },
          ],
        })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort(sortBy)
          .exec();

        const bookingsCount = await Booking.countDocuments({
          ...tempFilter,
          status: status,
          $or: [
            {
              address: { $regex: search, $options: 'i' },
            },
            {
              driverName: { $regex: search, $options: 'i' },
            },
            {
              driverEmail: { $regex: search, $options: 'i' },
            },
            {
              ownerName: { $regex: search, $options: 'i' },
            },
            {
              ownerEmail: { $regex: search, $options: 'i' },
            },
          ],
        });
        return {
          bookings: bookings,
          count: bookingsCount,
        };
      case 'getBookingsWithListingId':
        return await Booking.find({
          listingId: ObjectId(event.arguments.listingId),
        }).exec();
      case 'getBookingsWithOwnerId':
        return await Booking.find({
          ownerId: ObjectId(event.arguments.ownerId),
        }).exec();
      case 'getBookingsWithListingIdAndStatus':
        return await Booking.find({
          listingId: ObjectId(event.arguments.listingId),
          status: event.arguments.status,
        }).exec();
      case 'getDriverBookings':
        return await Booking.find({
          driverId: event.arguments.driverId,
        }).exec();
      case 'getOwnerBookings':
        return await Booking.find({
          ownerId: event.arguments.ownerId,
        }).exec();
      case 'checkBookingAvailability':
        const tempSlots = await Booking.find({
          listingId: ObjectId(event.arguments.listingId),
          $or: [
            {
              $and: [
                { startDate: { $lte: Date.parse(event.arguments.start) } },
                { endDate: { $gt: Date.parse(event.arguments.start) } },
              ],
            },
            {
              $and: [
                { startDate: { $lt: Date.parse(event.arguments.end) } },
                { endDate: { $gte: Date.parse(event.arguments.end) } },
              ],
            },
          ],
        });
        return tempSlots.map((s) => s.spaceLabel);
      case 'setupPayout':
        return await setupTransfer({
          bookingId: event.arguments.listingId,
          end: event.arguments.triggerTimer,
        });
      case 'createBooking':
        const newBooking = await Booking.create({
          ...event.arguments,
          listingId: ObjectId(event.arguments.listingId),
          startDate: Date.parse(event.arguments.start),
          endDate: Date.parse(event.arguments.end),
        });
        User.findOneAndUpdate(
          { username: event.arguments.driverId },
          { $inc: { bookings: 1 } }
        );
        // Send Email to driver and space owner
        const tempOwnerData = {
          emails: [event.arguments.ownerEmail],
          subject: 'You have a new Booking',
          message: 'A User just booked a space at your Parking!',
        };
        const tempDriverData = {
          emails: [event.arguments.driverEmail],
          subject: 'Booking Successful',
          message: 'Congratulations!Your Booking is Successful',
        };
        await mailer(tempOwnerData);
        await mailer(tempDriverData);
        await sendNotification({
          title: 'New Booking Received',
          message: `A booking for parking ${event.arguments.address} has been confirmed`,
          username: event.arguments.ownerId,
        });
        await sendNotification({
          title: 'Booking Confirmation',
          message: `Your booking for parking location ${event.arguments.address} has been confirmed`,
          username: event.arguments.driverId,
        });
        // Setup payout for space owner
        // await setupTransfer({
        //   bookingId: newBooking._id,
        //   end: newBooking.end,
        // });
        return newBooking;
      case 'updateBooking':
        return await Booking.findByIdAndUpdate(
          event.arguments.id,
          event.arguments,
          {
            new: true,
            runValidators: true,
          }
        );
      case 'updateBookingStatus':
        if (event.arguments.status === 'cancelled') {
          const tempBooking = await Booking.findById(
            ObjectId(event.arguments.id)
          );
          const tempRefund = await StripePayment.createRefund({
            paymentIntent: tempBooking.paymentIntent,
          });
          if (tempRefund === 'succeeded') {
            updatedBooking = await Booking.findByIdAndUpdate(
              ObjectId(event.arguments.id),
              { status: event.arguments.status },
              {
                new: true,
                runValidators: true,
              }
            );
            User.findOneAndUpdate(
              { username: event.arguments.driverId },
              { $inc: { bookings: -1 } }
            );
          } else {
            return null;
          }
        } else {
          updatedBooking = await Booking.findByIdAndUpdate(
            ObjectId(event.arguments.id),
            { status: event.arguments.status },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        //Send Email to driver and space owner
        if (event.arguments.status === 'current') {
          const tempOwnerData = {
            emails: [event.arguments.ownerEmail],
            subject: 'A User just Checked In',
            message: 'A User has been checked in successfully!',
          };
          const tempDriverData = {
            emails: [event.arguments.driverEmail],
            subject: 'You have Checked In',
            message: 'You have Checked in Successfully!',
          };
          await mailer(tempOwnerData);
          await mailer(tempDriverData);
        } else if (event.arguments.status === 'completed') {
          const tempOwnerData = {
            emails: [event.arguments.ownerEmail],
            subject: 'A User just Checked Out',
            message: 'A User has been checked out successfully!',
          };
          const tempDriverData = {
            emails: [event.arguments.driverEmail],
            subject: 'You have Checked Out',
            message: 'You have Checked Out Successfully!',
          };
          await mailer(tempOwnerData);
          await mailer(tempDriverData);
        }
        return updatedBooking;
      case 'deleteBooking':
        return await Booking.findByIdAndDelete(event.arguments.id);
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
