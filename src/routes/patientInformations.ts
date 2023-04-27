import express from "express";
import diagnosesService from "../services/diagnosesService";
import toNewPatientEntry, { toNewEntries } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnosesService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  res.send(diagnosesService.getNonSensitivePatient(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = diagnosesService.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }

    res.status(400).send(errorMessage);
  }
});
router.post("/:id/entries", (req, res) => {
  try {
    const patient = diagnosesService.getNonSensitivePatient(req.params.id);
    const newEntries = toNewEntries(req.body);

    const addedEntries = diagnosesService.addEntries(patient[0].id, newEntries);
    res.json(addedEntries);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    res.status(400).send({ errorMessage });
  }
});

export default router;
