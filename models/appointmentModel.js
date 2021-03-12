const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
    },
    start: {
        type: Date,
        required: [true, "Appointment must have start date"],
    },
    end: {
        type: Date,
        required: [true, "Appointment must have start date"],
    },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;