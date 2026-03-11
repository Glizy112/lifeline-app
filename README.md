<img width="28" height="28" alt="image" src="https://github.com/user-attachments/assets/7ccda8a3-186d-4afe-abe5-e86a9a0b4877" /># Project LifeLine: Secure Coding & Remediation Lab
Welcome to the **LifeLine App** Security Team.

### Scenario
You are a Junior Security Consultant at *FzCorp*. Our client, **LifeLine App**, recently suffered a data breach. Your predecessor identified several critical vulnerabilities in the `v1` API but was pulled off the project before they could fix them.

**Your mission:** Analyze the "Bad Code," implement industry-standard security patches (remediation), and verify the fixes using our automated regression suite.

## Tech Stack & Prerequisites
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite3 (In-memory)
* **Tools:** VS Code, Nodemon, Axios

## 🚀 Getting Started

### 1. Clone & Initialize
```bash
# Create your project folder
mkdir lifeline-app
cd lifeline-app

# Initialize and install dependencies
npm init -y
npm install express sqlite3 bcrypt jsonwebtoken
npm install --save-dev nodemon axios

```

### 2. Configure Scripts
Open `package.json` and update the `"scripts"` section:
```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "test": "node test_fixes.js"
}
```

### 3. Launch the Environment
Open two terminal tabs in VS Code:
* **Terminal 1:** Run `npm run dev` (This starts the server with hot-reloading).
* **Terminal 2:** Use this to run `npm test` to check your progress.

## The Vulnerability List (OWASP Top 10)
You must locate and fix the following issues in `app.js`:

| Risk ID | Vulnerability Name | Impact |
| --- | --- | --- |
| **A01** | Broken Access Control (IDOR) | Unauthorized users can view any patient's medication. |
| **A02** | Cryptographic Failures | Passwords stored in plaintext. |
| **A03** | Injection (SQLi) | Attackers can dump the entire database via the search bar. |
| **A09** | Logging Failures | Sensitive tokens and PII are being leaked into server logs. |

## Verification Workflow
1. **Observe the Failure:** Run `npm test`. You should see multiple **❌ FAIL** messages.
2. **Apply the Fix:** Try fixing the code yourself first. If needed, use *Secure Code Cheat Sheet* to modify the code in `app.js`.
3. **Save:** Hit `Ctrl+S`. **Nodemon** will automatically restart the server.
4. **Verify:** Run `npm test` again. Your goal is to see **✅ PASS** for all tests.

## Reporting Requirements (Deliverables)
Once all tests pass, prepare a brief **Remediation Report** for the client:
1. **The Bug:** Which OWASP category did it fall into?
2. **The Fix:** Provide a snippet of the "Before" vs "After" code.
3. **The Evidence:** A screenshot of your terminal showing the passing tests.

## ⚠️ Disclaimer
*This lab is to simulate work done at companies. The vulnerabilities included are intentional yet impactful if left-over in a production environment and can leave a bad impact on user data & trust.*

## Happy Hacking!🙂

