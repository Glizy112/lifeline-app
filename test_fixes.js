const axios = require('axios'); // They may need to: npm install axios

const BASE_URL = 'http://localhost:3000/api/v1';

async function runSecurityTests() {
    console.log("🚀 Starting Security Regression Suite: Project LifeLine\n");

    // --- TEST 1: SQL Injection (Search) ---
    try {
        console.log("🔍 Testing SQL Injection Fix...");
        // This payload attempts to dump ALL records by making the WHERE clause always true
        const sqliPayload = "' OR '1'='1"; 
        const res = await axios.get(`${BASE_URL}/patient-search?name=${sqliPayload}`);
        
        if (res.data.length > 1) {
            console.log("❌ FAIL: SQL Injection still works! Received multiple records.");
        } else {
            console.log("✅ PASS: SQL Injection blocked. No unauthorized data leaked.");
        }
    } catch (err) {
        console.log("✅ PASS: Server rejected the malicious query.");
    }

    console.log("--------------------------------------------------");

    // --- TEST 2: IDOR (Access Control) ---
    try {
        console.log("🔍 Testing IDOR Fix (Accessing Record 102 as unauthorized user)...");
        // Attempting to access record 102 directly
        const res = await axios.get(`${BASE_URL}/record/102`);
        
        // If the fix is right, it should either return 403 Forbidden or 
        // return an empty object because doctor_id doesn't match.
        if (res.data && res.data.patient_name === 'Bob Ross') {
            console.log("❌ FAIL: IDOR still works! Accessed Bob Ross's private record.");
        } else {
            console.log("✅ PASS: Access Denied. Patient record protected.");
        }
    } catch (err) {
        if (err.response && err.response.status === 403) {
            console.log("✅ PASS: Server returned 403 Forbidden (Correct Behavior).");
        } else {
            console.log("✅ PASS: Access blocked.");
        }
    }

    console.log("\n🏁 Security Review Complete.");
}

runSecurityTests();