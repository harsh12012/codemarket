const Ivdrip = require("../../models/ivdripModel");
const Therapie = require("../../models/therapieModel");
const Service = require("../../models/serviceModel");
const Team = require("../../models/teamModel");
const factory = require("../../utils/factorySwitch");
const DB = require("../../utils/DB");

DB();

exports.handler = async (event) => {
  switch (event.model) {
    case "Ivdrip":
      return factory(event, Ivdrip);
    case "Therapie":
      return factory(event, Therapie);
    case "Service":
      return factory(event, Service);
    case "Team":
      return factory(event, Team);
    default:
      return null;
  }
};
