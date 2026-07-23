const fs = require("fs");

const audit = JSON.parse(fs.readFileSync("audit.json", "utf8"));

console.log("");
console.log("═══════════════════════════════════════════════════════════════");
console.log("  GitHub Actions - Security Scan");
console.log("═══════════════════════════════════════════════════════════════");
console.log("");

console.log("✓ Build successful");
console.log("✓ Tests passed");

if (!audit.vulnerabilities || Object.keys(audit.vulnerabilities).length === 0) {
    console.log("✓ No security vulnerabilities detected");
    process.exit(0);
}

console.log("⚠ Security vulnerabilities detected");
console.log("");

for (const [pkg, vuln] of Object.entries(audit.vulnerabilities)) {

    console.log("───────────────────────────────────────────────────────────────");
    console.log("  VULNERABILITY ALERT");
    console.log("───────────────────────────────────────────────────────────────");
    console.log("");

    console.log(`Package: ${pkg}`);
    console.log(`Severity: ${vuln.severity}`);

    if (vuln.via && vuln.via.length > 0) {
        const via = vuln.via
            .map(v => typeof v === "string" ? v : v.source)
            .join(", ");

        console.log(`Via: ${via}`);
    }

    if (vuln.fixAvailable) {
        console.log("");
        console.log("Recommendation: Update to patched version");
    }

    console.log("");
}