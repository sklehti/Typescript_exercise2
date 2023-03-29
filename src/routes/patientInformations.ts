import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send(diagnosesService.getNonSensitivePatients());
});

export default router;
