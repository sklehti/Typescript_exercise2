import { Entry, EntryWithoutId } from "./../types";
import diagnosisData from "../../data/diagnosis";
import patientsData from "../../data/patients-full";
import { Diagnosis, Patients, NewPatientEntry, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";

const getDiagnoses = (): Diagnosis[] => {
  return diagnosisData;
};

const getNonSensitivePatients = (): Patients[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getNonSensitivePatient = (id: string): Patients[] => {
  const rightData = patientsData.filter((d) => d.id === id);
  return rightData;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuidv4();
  const newPatientEntry = {
    id: id,
    ...entry,
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntries = (patientId: string, entry: EntryWithoutId): Entry => {
  const entriesId: string = uuidv4();

  const newEntries: Entry = {
    id: entriesId,
    ...entry,
  };

  patientsData.map((p) => {
    if (p.id === patientId) p.entries.push(newEntries);
  });

  return newEntries;
};

export default {
  getDiagnoses,
  getNonSensitivePatients,
  getNonSensitivePatient,
  addPatient,
  addEntries,
};
