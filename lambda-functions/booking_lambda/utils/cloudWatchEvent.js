const AWS = require("aws-sdk");

AWS.config.region = "us-east-1";

AWS.config.apiVersions = {
  cloudwatchevents: "2015-10-07",
  lambda: "2015-03-31",
};

const addLambdaPremission = (data) => {
  var params = {
    Action: "lambda:invokeFunction",
    FunctionName: "vivek-testing",
    Principal: "events.amazonaws.com",
    StatementId: "allow-rule-invoke-" + data.Name,
    SourceArn: data.RuleArn,
  };
  return new AWS.Lambda().addPermission(params).promise();
};

const putRule = (data) => {
  var params = {
    Name: data.Name,
    // RoleArn: data.RoleArn,
    Description: data.Description,
    ScheduleExpression: data.ScheduleExpression,
    State: "ENABLED",
  };
  return new AWS.CloudWatchEvents().putRule(params).promise();
};

const putTarget = (data) => {
  var params = {
    Rule: data.Name,
    Targets: [
      {
        Arn: data.targetArn,
        Id: data.Name,
        Input: JSON.stringify(data.Input),
      },
    ],
  };
  return new AWS.CloudWatchEvents().putTargets(params).promise();
};

const setupTransfer = async (input) => {
  let currentDate3 = new Date();
  currentDate3.setDate(currentDate3.getDate() + 3);
  let triggerDate = new Date(input.end);
  if (triggerDate < currentDate3) {
    triggerDate = currentDate3;
  }
  var hour = triggerDate.getHours();
  var dayofmonth = triggerDate.getDate();
  var month = triggerDate.getMonth();
  var year = triggerDate.getFullYear();
  const ScheduleExpression = `cron(0 ${hour} ${dayofmonth} ${
    month + 1
  } ? ${year})`;
  const data = {
    Name: `${input.bookingId}`,
    Id: `id ${input.bookingId}`,
    Description: "Transfer to Owner and Tax Account",
    // RoleArn: "arn:aws:iam::784380094623:role/vivek-cloudwatchevent-role",
    targetArn:
      "arn:aws:lambda:us-east-1:784380094623:function:parkyourself-backend-vivekt-local-payment_lambda",
    ScheduleExpression: ScheduleExpression, // cron(0 10 16 6 ? 2021) // rate(1 minute)
    Input: {
      type: "stripeCreateTransfer",
      arguments: { bookingId: input.bookingId },
    },
  };
  const rule = await putRule(data);
  // console.log("rule", rule);
  const target = await putTarget(data);
  // console.log("target", target);
  const premission = await addLambdaPremission({
    RuleArn: rule.RuleArn,
    Name: data.Name,
  });
  // console.log("premission", premission);
  return true;
};

// let currentDate = new Date();
// console.log("currentDate ", currentDate);

// let currentDate3 = new Date();
// currentDate3.setDate(currentDate3.getDate() + 3);
// console.log("currentDate3 ", currentDate3);

// let triggerDate = new Date("2020-11-17T16:27:09.061Z");
// // triggerDate.setDate(triggerDate.getDate() + 5);
// console.log("triggerDate ", triggerDate);

// if (triggerDate < currentDate3) {
//   triggerDate = currentDate3;
// }

// var hour = triggerDate.getHours();
// var dayofmonth = triggerDate.getDate();
// var month = triggerDate.getMonth();
// var year = triggerDate.getFullYear();

// console.log("hour", hour);
// console.log("dayofmonth", dayofmonth);
// console.log("month", month);
// console.log("year", year);

// setupTransfer({
//   bookingId: "5fb417626a886e0008712077",
//   end: new Date(),
//   amount: 1000,
// });

module.exports = {
  setupTransfer: setupTransfer,
};

// node lambda-functions/booking_lambda/utils/cloudWatchEvent.js
