import express from "express";
import rekapController from "../controllers/rekapController.js";

const router = express.Router();

router.get("/ballot", rekapController.getAllTpsResult);
router.get(
  "/ballot-district/:districtId",
  rekapController.getAllTpsResultByDistrictId
);
router.get("/districts", rekapController.getAllDistrictWithResultVotes);
router.get(
  "/villages/:districtId",
  rekapController.getAllVillageByDistrictIdWithResultVote
);
router.get(
  "/tps/:villageId",
  rekapController.getAllTpsByVillageIdWithResultVote
);

router.get("/candidate", rekapController.getAllCandidatesRekap);
router.get(
  "/candidate/district/:districtId",
  rekapController.getAllCandidatesRekapByDistrictId
);
router.get(
  "/candidate/village/:villageId",
  rekapController.getAllCandidatesRekapByVillageId
);

export default router;
