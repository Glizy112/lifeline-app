const express = require('express');
const sqlite3 = require('sqlite3').verbose();
//const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const db = new sqlite3.Database(':memory:');

// SETUP: Creating a mock Healthcare Database
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER, username TEXT, password TEXT, role TEXT)");
  db.run("CREATE TABLE records (id INTEGER, patient_name TEXT, diagnosis TEXT, medication TEXT, doctor_id INTEGER)");
  
  // Vulnerability #1: Storing Plaintext Passwords (A02:2021-Cryptographic Failures)
  db.run("INSERT INTO users VALUES (1, 'dr_smith', 'password123', 'doctor')");
  db.run("INSERT INTO records VALUES (101, 'Alice Brown', 'Type 1 Diabetes', 'Insulin', 1)");
  db.run("INSERT INTO records VALUES (102, 'Bob Ross', 'Hypertension', 'Lisinopril', 2)");
});

// --- VULNERABLE ENDPOINTS ---

// 1. SQL Injection (A03:2021-Injection)
app.get('/api/v1/patient-search', (req, res) => {
  const name = req.query.name;
  // IMPACT: An attacker can search for "' OR '1'='1" to dump the entire patient database.
  const query = `SELECT * FROM records WHERE patient_name = '${name}'`;
  
  db.all(query, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// 2. IDOR - Insecure Direct Object Reference (A01:2021-Broken Access Control)
app.get('/api/v1/record/:id', (req, res) => {
  // IMPACT: A doctor can change the :id to see records of patients NOT assigned to them.
  const query = `SELECT * FROM records WHERE id = ${req.params.id}`;
  
  db.get(query, (err, row) => {
    res.json(row); 
  });
});

// 3. Sensitive Data Exposure in Logs (A09:2021-Security Logging and Monitoring Failures)
app.post('/api/v1/update-medication', (req, res) => {
  const { recordId, newMedication, auth_token } = req.body;
  // IMPACT: Logging sensitive PII and auth tokens to console/files is a major violation.
  console.log(`[DEBUG] Update Request: Token=${auth_token}, Record=${recordId}, Med=${newMedication}`);
  res.send("Medication updated (Simulation)");
});

app.listen(3000, () => console.log('LifeLine Health V1 (Vulnerable) running on port 3000'));





/*fetch("http://localhost:3000/api/v1/update-medication", 
    {
        method: 'POST', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({
                recordId: 101, 
                newMedication: "Sitagliptin & Metformin", 
                auth_token: "eybksfhskjfdsjlfkjslfkd122kdkjfhdshfd387sjsjkbla"
        })
    }
  ).then(res=> console.log(res.json()))
   .catch(err=> console.log(err))
*/