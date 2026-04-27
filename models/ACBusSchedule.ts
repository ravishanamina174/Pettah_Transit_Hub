import mongoose, { Schema, model, models } from "mongoose";

const ACBusScheduleSchema = new Schema({
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

// Explicitly connecting to the "timetables-AC" collection
export const ACBusSchedule = models.ACBusSchedule || model("ACBusSchedule", ACBusScheduleSchema, "timetables-AC");