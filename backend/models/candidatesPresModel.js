import mongoose from "mongoose";

const candidatesSchema = mongoose.Schema({
  paslonNumber: {
    type: String,
    required: true,
  },
  capresDetail: {
    name: {
      type: String,
      required: true,
    },
    partyName: {
      type: String,
      requred: true,
    },
  },
  cawapresDetail: {
    name: {
      type: String,
      required: true,
    },
    partyName: {
      type: String,
      requred: true,
    },
  },
});

const Candidates = mongoose.model("Candidates", candidatesSchema);
export default Candidates;
