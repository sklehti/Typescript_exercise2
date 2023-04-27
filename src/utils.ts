import { NewPatientEntry, Gender, Diagnosis, HealthCheckRating } from "./types";
import { EntryWithoutId } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((h) => h)
    .includes(param);
};

const parseString = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing string");
  }
  return name;
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form

    return object as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect healthCheckRaiting value: " + healthCheckRating);
  }
  return healthCheckRating;
};

export const toNewEntries = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    const commonFields = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    switch (object.type) {
      case "Hospital":
        if (
          "discharge" in object &&
          typeof object.discharge === "object" &&
          object.discharge !== null &&
          "date" in object.discharge &&
          "criteria" in object.discharge
        ) {
          const newEntry: EntryWithoutId = {
            ...commonFields,
            type: "Hospital",
            discharge: {
              date: parseDate(object.discharge.date),
              criteria: parseString(object.discharge.criteria),
            },
          };
          return newEntry;
        }
        break;

      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const newEntry: EntryWithoutId = {
            ...commonFields,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newEntry;
        }
        break;

      case "OccupationalHealthcare":
        if (
          "employerName" in object &&
          "sickLeave" in object &&
          typeof object.sickLeave === "object" &&
          object.sickLeave !== null &&
          "startDate" in object.sickLeave &&
          "endDate" in object.sickLeave
        ) {
          const newEntry: EntryWithoutId = {
            ...commonFields,
            type: "OccupationalHealthcare",
            employerName: parseString(object.employerName),
            sickLeave: {
              startDate: parseString(object.sickLeave.startDate),
              endDate: parseString(object.sickLeave.endDate),
            },
          };
          return newEntry;
        }
        break;
      default:
        throw new Error(`Invalid entry type: ${object.type}`);
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "ssn" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseString(object.ssn),
      occupation: parseString(object.occupation),
      entries: [],
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;
