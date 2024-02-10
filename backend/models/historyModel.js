import mongoose from "mongoose";

const historySchema = mongoose.Schema(
  {
    tps_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tps",
      required: true,
    },
    tps_number: String,
    history: [
      {
        updated_at: {
          type: Date,
          required: true,
        },
        created_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        total_voters: Number,
        total_invalid_ballots: Number,
        total_valid_ballots: Number,
        valid_ballots_detail: [
          {
            candidates_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Candidates",
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
            total_votes: Number,
            paslonNumber: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

export default History;
