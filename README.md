## To run locally

- `npm i`

- `npm start`

- open: http://localhost:3001/api/patients

- open: http://localhost:3001/api/diagnoses

### adding a patient:

<!--
For example, you can add patient information in Postman as follows:

- Open Postman
- Add for example, the following address: http://localhost:3001/api/patients
- Use POST request
- Add body (JSON), for example:

  {
    "name": "mää vaan",
    "dateOfBirth": "1986-07-09",
    "gender": "male",
    "ssn": "123456-123A",
    "occupation": "New york city cop"
  }

- And send request
-->

### Adding a diagnosis to a patient Adding:

<!--
You can also add information for the patient you want:

- Open Postman
- Add for example, the following address: http://localhost:3001/api/patients/ADD_PATIENT_ID_HERE/entries
- Use POST request
- Add body (JSON), for example:

  {
    "description": "discription here...",
    "date": "2019-08-05",
    "type": "OccupationalHealthcare",
    "specialist": "MD House",
    "diagnosisCodes": ["Z57.1"],
    "employerName": "Maija Meikäläinen",
    "sickLeave": {
    "startDate": "2019-08-05",
    "endDate": "2019-08-28"
    }
  }

- And send request
-->
