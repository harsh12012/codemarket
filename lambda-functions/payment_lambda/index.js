const AWS = require("aws-sdk");
const DB = require("../../utils/DB");
const Booking = require("../booking_lambda/utils/bookingModel");
const StripeConnect = require("./utils/stripeConnectModel");
const StripeCustomer = require("./utils/stripeCustomerModel");
const StripeConnectMethods = require("./utils/stripeConnect");
const StripePayment = require("./utils/stripePayment");
const ObjectId = require("mongodb").ObjectID;
DB();

const UserPoolId = process.env.USER_POOL_ID;

const getUser = (sub) => {
  var params = {
    UserPoolId: UserPoolId,
    Username: sub,
  };
  return (sendPromise = new AWS.CognitoIdentityServiceProvider()
    .adminGetUser(params)
    .promise());
};

exports.handler = async (event) => {
  try {
    let tempDriver = null;
    let tempOwner = null;
    let newCustomer = null;
    let tempCustomer = null;
    let tempBooking = null;
    switch (event.type) {
      case "stripeCreateAccountLinks":
        const user2 = await StripeConnect.findOne({
          userId: event.arguments.userId,
        });
        if (user2) {
          const link = await StripeConnectMethods.createAccountLinks({
            account: user2.account,
            type: event.arguments.type,
            refresh_url: event.arguments.refresh_url,
            return_url: event.arguments.return_url,
          });
          return JSON.stringify(link);
        } else {
          const newAccount = await StripeConnectMethods.createAccount({
            email: event.arguments.email,
          });
          const newUser = await StripeConnect.create({
            userId: event.arguments.userId,
            account: newAccount.id,
          });
          const newLink = await StripeConnectMethods.createAccountLinks({
            account: newUser.account,
            type: event.arguments.type,
            refresh_url: event.arguments.refresh_url,
            return_url: event.arguments.return_url,
          });
          return JSON.stringify(newLink);
        }
      case "stripeRetrieveAccount":
        const user3 = await StripeConnect.findOne({
          userId: event.arguments.userId,
        });
        if (user3) {
          return JSON.stringify(
            await StripeConnectMethods.retrieveAccount({
              account: user3.account,
            })
          );
        } else {
          return null;
        }
      case "stripeCreateLoginLinkAccount":
        tempOwner = await StripeConnect.findOne({
          userId: event.arguments.userId,
        });
        if (tempOwner) {
          return JSON.stringify(
            await StripeConnectMethods.createLoginLinkAccount({
              account: tempOwner.account,
            })
          );
        } else {
          return null;
        }
      case "stripeRetrieveBalance":
        tempOwner = await StripeConnect.findOne({
          userId: event.arguments.userId,
        });
        if (tempOwner) {
          return JSON.stringify(
            await StripeConnectMethods.retrieveBalance({
              account: tempOwner.account,
            })
          );
        } else {
          return null;
        }
      case "stripeCreatePaymentIntent":
        tempDriver = await StripeCustomer.findOne({
          userId: event.arguments.driverId,
          type: event.arguments.type,
        });
        if (tempDriver) {
          tempOwner = await StripeConnect.findOne({
            userId: event.arguments.ownerId,
          });
          if (tempOwner) {
            return await StripePayment.createPaymentIntent({
              ...event.arguments,
              account: tempOwner.account,
              customer: tempDriver.customer,
            });
          } else {
            return null;
          }
        } else {
          newCustomer = await StripePayment.createCustomer({
            email: event.arguments.email,
            name: event.arguments.name,
          });
          tempCustomer = await StripeCustomer.create({
            userId: event.arguments.driverId,
            customer: newCustomer,
            type: event.arguments.type,
          });
          tempOwner = await StripeConnect.findOne({
            userId: event.arguments.ownerId,
          });
          if (tempOwner) {
            return await StripePayment.createPaymentIntent({
              ...event.arguments,
              account: tempOwner.account,
              customer: tempCustomer.customer,
            });
          } else {
            return null;
          }
        }

      case "stripeCreatePaymentIntentOffline":
        tempDriver = await StripeCustomer.findOne({
          userId: event.arguments.driverId,
          type: event.arguments.type,
        });
        tempOwner = await StripeConnect.findOne({
          userId: event.arguments.ownerId,
        });
        if (tempDriver && tempOwner) {
          return await StripePayment.createPaymentIntentOffline({
            ...event.arguments,
            customer: tempDriver.customer,
            account: tempOwner.account,
          });
        } else {
          return null;
        }
      case "stripeCreateSetupIntent":
        tempDriver = await StripeCustomer.findOne({
          userId: event.arguments.driverId,
          type: event.arguments.type,
        });
        if (tempDriver) {
          return await StripePayment.createSetupIntent({
            customer: tempDriver.customer,
          });
        } else {
          newCustomer = await StripePayment.createCustomer({
            email: event.arguments.email,
            name: event.arguments.name,
          });
          tempCustomer = await StripeCustomer.create({
            userId: event.arguments.driverId,
            customer: newCustomer,
            type: event.arguments.type,
          });
          return await StripePayment.createSetupIntent({
            customer: tempCustomer.customer,
          });
        }
      case "stripeListUserCards":
        tempDriver = await StripeCustomer.findOne({
          userId: event.arguments.driverId,
          type: event.arguments.type,
        });
        if (tempDriver) {
          return JSON.stringify(
            await StripePayment.listPaymentMethods({
              customer: tempDriver.customer,
            })
          );
        } else {
          return null;
        }
      case "stripeGetPaymentMethod":
        return JSON.stringify(
          await StripePayment.retrievePaymentMethod({
            payment_method: event.arguments.payment_method,
          })
        );
      case "stripeDetachPaymentMethod":
        return await StripePayment.detachPaymentMethod({
          payment_method: event.arguments.payment_method,
        });

      case "stripeGetPaymentReport":
            tempOwner = await StripeConnect.findOne({
              userId: event.arguments.userId,
            });

            tempAccount =  tempOwner ? await StripeConnectMethods.retrieveBalance({
                account: tempOwner.account,
              }
            ):
            null
            
          tempBooking =  await Booking.find({ownerId:event.arguments.userId})
          totalEarnings = 0;
          lastMonthEarnings = 0;
          tempBooking.map((s) => {totalEarnings = totalEarnings+s.ownerPayment});
          lastMonthData = tempBooking.filter(item => new Date(item.createdAt).getMonth() === ((new Date().getMonth()) - 1) )
          lastMonthData.map((s) => {lastMonthEarnings = lastMonthEarnings+s.ownerPayment});

          return {
            totalEarnings:totalEarnings,
            lastMonthEarnings:lastMonthEarnings,
            availableForWithdrawal:JSON.stringify(tempAccount)
        }

      case "stripeCreateTransfer":
        tempBooking = await Booking.findById(
          ObjectId(event.arguments.bookingId)
        );
        if (tempBooking && tempBooking.status !== "cancelled") {
          tempOwner = await StripeConnect.findOne({
            userId: tempBooking.ownerId,
          });
          if (tempOwner) {
            // $1 tranfer to tax account
            await StripePayment.createTransfer({
              account: process.env.TAX_ACCOUNT,
              transfer_group: tempBooking.transferGroup,
              amount: 100,
            });
            // tranfer to Space Owner account
            return JSON.stringify(
              await StripePayment.createTransfer({
                account: tempOwner.account,
                transfer_group: tempBooking.transferGroup,
                amount: parseInt(
                  (
                    (tempBooking.ownerPayment -
                      tempBooking.ownerPayment * 0.15) *
                    100
                  ).toFixed(2)
                ),
              })
            );
          } else {
            return null;
          }
        } else {
          return null;
        }
      default:
        return null;
    }
  } catch (error) {
    throw error;
  }
};
