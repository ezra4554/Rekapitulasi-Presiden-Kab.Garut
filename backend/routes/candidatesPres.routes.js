import express from "express";
import candidatesPresController from "../controllers/candidatesPresController.js";
import { protectAdminRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post(
  "/bulk",
  protectAdminRoute,
  candidatesPresController.createBulkCandidates
);
router.post("/", protectAdminRoute, candidatesPresController.createCandidate);
router.get("/", candidatesPresController.getAllCandidates);
router.delete(
  "/:candidateId",
  protectAdminRoute,
  candidatesPresController.deleteCandidate
);

export default router;
