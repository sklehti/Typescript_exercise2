"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicalRecords_1 = __importDefault(require("./routes/medicalRecords"));
const patientInformations_1 = __importDefault(require("./routes/patientInformations"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3001;
app.get("/api/ping", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log("someone pinged here");
    res.send("pong");
});
app.use("/api/diagnoses", medicalRecords_1.default);
app.use("/api/patients", patientInformations_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
