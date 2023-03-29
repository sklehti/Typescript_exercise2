import diagnosesData from "../../data/diagnoses";
import patientsData from "../../data/patients";
import { DiagnosesEntry, Patients } from "../types";

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnosesData;
};

const getNonSensitivePatients = (): Patients[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getDiagnoses,
  getNonSensitivePatients,
};
