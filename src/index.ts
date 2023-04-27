import express from "express";
import medicalRecordsRouter from "./routes/medicalRecords";
import patientInformations from "./routes/patientInformations";
import cors from "cors";

const app = express();
app.use(express.json());

const PORT = 3001;

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", medicalRecordsRouter);

app.use("/api/patients", patientInformations);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
