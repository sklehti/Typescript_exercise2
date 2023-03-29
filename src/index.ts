import express from "express";
import medicalRecordsRouter from "./routes/medicalRecords";
import patientInformations from "./routes/patientInformations";

const app = express();
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", medicalRecordsRouter);

app.use("/api/patients", patientInformations);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
