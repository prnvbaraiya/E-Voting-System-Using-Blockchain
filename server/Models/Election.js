import mongoose from "mongoose";

const ElectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  candidates: {
    type: Array,
    required: true,
  },
  currentPhase: {
    type: String,
    default: "init", //init, registration, voting, result
  },
});

const Election = mongoose.model("Election", ElectionSchema);
export default Election;
