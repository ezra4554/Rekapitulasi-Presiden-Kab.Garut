import Tps from "../models/tpsModel.js";
import apiHandler from "../utils/apiHandler.js";

const rekapController = {
  getAllTpsResult: async (req, res) => {
    try {
      // Ambil semua TPS
      const tps = await Tps.find().select(
        "_id total_voters total_invalid_ballots total_valid_ballots valid_ballots_detail"
      );
      // Proses secara paralel untuk mendapatkan hasil yang diinginkan
      const [aggregatedResult, valid_ballots_detail] = await Promise.all([
        calculateAggregatedResult(tps),
        getValidBallotsHelper(tps),
      ]);
      // console.log(valid_ballots_detail);

      return apiHandler({
        res,
        status: "success",
        code: 200,
        message: "Voting results for all TPS retrieved successfully",
        data: { ...aggregatedResult, valid_ballots_detail },
        error: null,
      });
    } catch (error) {
      console.error("Error getting total results by district:", error);
      return apiHandler({
        res,
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
        error: { type: "InternalServerError", details: error.message },
      });
    }
  },
  getAllTpsResultByDistrictId: async (req, res) => {
    try {
      const { districtId } = req.params;
      // Ambil semua TPS
      const tps = await Tps.find({ district_id: districtId }).select(
        "_id total_voters total_invalid_ballots total_valid_ballots valid_ballots_detail"
      );

      // Proses secara paralel untuk mendapatkan hasil yang diinginkan
      const [aggregatedResult, valid_ballots_detail] = await Promise.all([
        calculateAggregatedResult(tps),
        getValidBallotsHelper(tps),
      ]);

      return apiHandler({
        res,
        status: "success",
        code: 200,
        message: "Voting results for all TPS retrieved successfully",
        data: { ...aggregatedResult, valid_ballots_detail },
        error: null,
      });
    } catch (error) {
      console.error("Error getting total results by district:", error);
      return apiHandler({
        res,
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
        error: { type: "InternalServerError", details: error.message },
      });
    }
  },
  getAllDistrictWithResultVotes: async (req, res) => {
    try {
      // Ambil semua TPS dengan informasi district
      const tps = await Tps.find()
        .populate("district_id", "name")
        .select(
          "_id district_id total_voters total_invalid_ballots total_valid_ballots"
        );

      // Hitung hasil agregat untuk setiap kecamatan
      const aggregatedDistrictResults = tps.reduce(
        (districtResults, tpsItem) => {
          const districtId = tpsItem.district_id._id;

          if (!districtResults[districtId]) {
            districtResults[districtId] = {
              district_id: districtId,
              district_name: tpsItem.district_id.name,
              total_voters: 0,
              total_invalid_ballots: 0,
              total_valid_ballots: 0,
            };
          }

          districtResults[districtId].total_voters += tpsItem.total_voters;
          districtResults[districtId].total_invalid_ballots +=
            tpsItem.total_invalid_ballots;
          districtResults[districtId].total_valid_ballots +=
            tpsItem.total_valid_ballots;

          return districtResults;
        },
        {}
      );

      const aggregatedResultsArray = Object.values(aggregatedDistrictResults);

      return apiHandler({
        res,
        status: "success",
        code: 200,
        message:
          "Aggregated voting results for all districts retrieved successfully",
        data: aggregatedResultsArray,
        error: null,
      });
    } catch (error) {
      console.error("Error getting total results by district:", error);
      return apiHandler({
        res,
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
        error: { type: "InternalServerError", details: error.message },
      });
    }
  },
  getAllVillageByDistrictIdWithResultVote: async (req, res) => {
    try {
      const { districtId } = req.params;

      // Ambil semua TPS dengan informasi desa berdasarkan districtId
      const tpsInDistrict = await Tps.find({ district_id: districtId })
        .populate("village_id", "name")
        .select(
          "_id village_id total_voters total_invalid_ballots total_valid_ballots"
        );

      // Hitung hasil agregat untuk setiap desa
      const aggregatedVillageResults = tpsInDistrict.reduce(
        (villageResults, tpsItem) => {
          const villageId = tpsItem.village_id._id;

          if (!villageResults[villageId]) {
            villageResults[villageId] = {
              village_id: villageId,
              village_name: tpsItem.village_id.name,
              total_voters: 0,
              total_invalid_ballots: 0,
              total_valid_ballots: 0,
            };
          }

          villageResults[villageId].total_voters += tpsItem.total_voters;
          villageResults[villageId].total_invalid_ballots +=
            tpsItem.total_invalid_ballots;
          villageResults[villageId].total_valid_ballots +=
            tpsItem.total_valid_ballots;

          return villageResults;
        },
        {}
      );

      const aggregatedResultsArray = Object.values(aggregatedVillageResults);

      return apiHandler({
        res,
        status: "success",
        code: 200,
        message:
          "Aggregated voting results for all villages in the district retrieved successfully",
        data: aggregatedResultsArray,
        error: null,
      });
    } catch (error) {
      console.error("Error getting total results by village:", error);
      return apiHandler({
        res,
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
        error: { type: "InternalServerError", details: error.message },
      });
    }
  },
  getAllTpsByVillageIdWithResultVote: async (req, res) => {
    try {
      const { villageId } = req.params;

      // Ambil semua TPS dengan informasi desa berdasarkan villageId
      const tpsInVillage = await Tps.find({ village_id: villageId }).select(
        "_id number total_voters total_invalid_ballots total_valid_ballots "
      );

      const tpsInVillageValidBallotDetail = await Tps.find({
        village_id: villageId,
      }).select("valid_ballots_detail");
      const [aggregatedResult, valid_ballots_detail] = await Promise.all([
        calculateAggregatedResult(tpsInVillage),
        getValidBallotsHelper(tpsInVillageValidBallotDetail),
      ]);

      return apiHandler({
        res,
        status: "success",
        code: 200,
        message: "results for all TPS in the village retrieved successfully",
        data: { tpsInVillage, ...aggregatedResult, valid_ballots_detail },
        error: null,
      });
    } catch (error) {
      console.error("Error getting total results tps by village:", error);
      return apiHandler({
        res,
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
        error: { type: "InternalServerError", details: error.message },
      });
    }
  },
  getAllCandidatesRekap: async (req, res) => {
    try {
      // Find all tps
      const tps = await Tps.find().select(
        "_id total_voters total_invalid_ballots total_valid_ballots valid_ballots_detail"
      );

      let valid_ballots_detail = await getValidBallotsHelper(tps);

      // Return the aggregated result
      return apiHandler({
        res,
        status: "success",
        code: 200,
        message: "Get caleg result on all tps successfully",
        data: valid_ballots_detail,
        error: null,
      });
    } catch (error) {
      console.error("Error getting total results by caleg:", error);
      return apiHandler({
        res,
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
        error: { type: "InternalServerError", details: error.message },
      });
    }
  },
  getAllCandidatesRekapByDistrictId: async (req, res) => {
    const { districtId } = req.params;
    try {
      // Find all tps
      const tps = await Tps.find({ district_id: districtId }).select(
        "_id total_voters total_invalid_ballots total_valid_ballots valid_ballots_detail"
      );

      let valid_ballots_detail = await getValidBallotsHelper(tps);

      // Return the aggregated result
      return apiHandler({
        res,
        status: "success",
        code: 200,
        message: "Get caleg result by district successfully",
        data: valid_ballots_detail,
        error: null,
      });
    } catch (error) {
      console.error("Error getting total results by caleg:", error);
      return apiHandler({
        res,
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
        error: { type: "InternalServerError", details: error.message },
      });
    }
  },
  getAllCandidatesRekapByVillageId: async (req, res) => {
    const { villageId } = req.params;
    try {
      // Find all tps
      const tps = await Tps.find({ village_id: villageId }).select(
        "_id total_voters total_invalid_ballots total_valid_ballots valid_ballots_detail"
      );

      let valid_ballots_detail = await getValidBallotsHelper(tps);

      // Return the aggregated result
      return apiHandler({
        res,
        status: "success",
        code: 200,
        message: "Get caleg result by district successfully",
        data: valid_ballots_detail,
        error: null,
      });
    } catch (error) {
      console.error("Error getting total results by caleg:", error);
      return apiHandler({
        res,
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
        error: { type: "InternalServerError", details: error.message },
      });
    }
  },
};

const getValidBallotsHelper = async (validBallots) => {
  try {
    // Memastikan validBallots adalah array
    const ballotsArray = Array.isArray(validBallots)
      ? validBallots
      : [validBallots];

    const totalVotes = ballotsArray.reduce((acc, result) => {
      for (const candidate of Object.values(result.valid_ballots_detail)) {
        const candidateId = candidate.candidates_id;

        if (!acc[candidateId]) {
          acc[candidateId] = {
            candidates_id: candidateId,
            paslonNumber: candidate.paslonNumber,
            capresDetail: {
              name: candidate.capresDetail.name,
              partyName: candidate.capresDetail.partyName,
            },
            cawapresDetail: {
              name: candidate.cawapresDetail.name,
              partyName: candidate.cawapresDetail.partyName,
            },
            total_votes: 0,
          };
        }
        acc[candidateId].total_votes = candidate.total_votes;
      }

      return acc;
    }, {});

    const totalVotesTransformed = Object.values(totalVotes).map(
      (candidate) => ({
        candidates_id: candidate.candidates_id,
        paslonNumber: candidate.paslonNumber,
        capresDetail: {
          name: candidate.capresDetail.name,
          partyName: candidate.capresDetail.partyName,
        },
        cawapresDetail: {
          name: candidate.cawapresDetail.name,
          partyName: candidate.cawapresDetail.partyName,
        },
        total_votes: candidate.total_votes,
      })
    );
    // console.log(totalVotesTransformed);

    return totalVotesTransformed;
  } catch (error) {
    console.error("Error getting total results by district:", error);
    return null;
  }
};

const calculateAggregatedResult = (tps) => {
  // Hitung hasil agregat dari data TPS
  const aggregatedResult = {
    total_invalid_ballots: tps.reduce(
      (total, tps) => total + tps.total_invalid_ballots,
      0
    ),
    total_valid_ballots: tps.reduce(
      (total, tps) => total + tps.total_valid_ballots,
      0
    ),
    total_voters: tps.reduce((total, tps) => total + tps.total_voters, 0),
  };

  return aggregatedResult;
};

export default rekapController;
