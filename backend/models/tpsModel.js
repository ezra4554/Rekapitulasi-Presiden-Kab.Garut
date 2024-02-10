import mongoose from "mongoose";

const tpsSchema = new mongoose.Schema({
  village_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Village",
    required: true,
  },
  village_code: {
    type: String,
    required: true,
  },
  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  is_fillBallot: {
    type: Boolean,
    default: false,
  },
  total_voters: {
    type: Number,
    required: true,
    min: [0, "Total pemilih harus non-negatif."],
  },
  total_invalid_ballots: {
    type: Number,
    default: 0,
    min: [0, "Total suara tidak sah harus non-negatif."],
  },
  total_valid_ballots: {
    type: Number,
    default: 0,
    min: [0, "Total suara sah harus non-negatif."],
  },
  valid_ballots_detail: [
    {
      candidates_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidates",
      },
      paslonNumber: {
        type: String,
      },
      capresDetail: {
        name: {
          type: String,
        },
        partyName: {
          type: String,
        },
      },
      cawapresDetail: {
        name: {
          type: String,
        },
        partyName: {
          type: String,
        },
      },
      total_votes: {
        type: Number,
        default: 0,
        min: [0, "Total suara partai harus non-negatif."],
      },
    },
  ],
});

export default mongoose.model("Tps", tpsSchema);
