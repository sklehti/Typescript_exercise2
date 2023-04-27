"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
const utils_1 = __importStar(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(diagnosesService_1.default.getNonSensitivePatients());
});
router.get("/:id", (req, res) => {
    res.send(diagnosesService_1.default.getNonSensitivePatient(req.params.id));
});
router.post("/", (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedEntry = diagnosesService_1.default.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += "Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post("/:id/entries", (req, res) => {
    try {
        const patient = diagnosesService_1.default.getNonSensitivePatient(req.params.id);
        const newEntries = (0, utils_1.toNewEntries)(req.body);
        const addedEntries = diagnosesService_1.default.addEntries(patient[0].id, newEntries);
        res.json(addedEntries);
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send({ errorMessage });
    }
});
exports.default = router;
