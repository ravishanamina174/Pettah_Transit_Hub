import mongoose, { Schema, model, models } from "mongoose";

const BusScheduleSchema = new Schema({
  corridor: String,
  routeNo: String,
  destination: {
    english: String,
    sinhala: String,
    tamil: String,
  },
  platform: String,
  time: String,
});

export const BusSchedule = models.BusSchedule || model("BusSchedule", BusScheduleSchema, "timetables");
// "timetables" is the name of your collection in Atlas