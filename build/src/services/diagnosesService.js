"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnosis_1 = __importDefault(require("../../data/diagnosis"));
const patients_full_1 = __importDefault(require("../../data/patients-full"));
const uuid_1 = require("uuid");
const getDiagnoses = () => {
    return diagnosis_1.default;
};
const getNonSensitivePatients = () => {
    return patients_full_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const getNonSensitivePatient = (id) => {
    const rightData = patients_full_1.default.filter((d) => d.id === id);
    return rightData;
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v4)();
    const newPatientEntry = Object.assign({ id: id }, entry);
    patients_full_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const addEntries = (patientId, entry) => {
    const entriesId = (0, uuid_1.v4)();
    const newEntries = Object.assign({ id: entriesId }, entry);
    patients_full_1.default.map((p) => {
        if (p.id === patientId)
            p.entries.push(newEntries);
    });
    return newEntries;
};
exports.default = {
    getDiagnoses,
    getNonSensitivePatients,
    getNonSensitivePatient,
    addPatient,
    addEntries,
};
