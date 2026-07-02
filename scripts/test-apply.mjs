const form = new FormData();
form.append("fullName", "Test User");
form.append("phone", "+359888000000");
form.append("city", "Sofia");
form.append("age", "30");
form.append("motivation", "financial");
form.append("effortResponse", "ask_team");
form.append("multiculturalAttitude", "excited");
form.append("conflictResolution", "compromise");
form.append("differentStyleHandling", "understand");
form.append("_gotcha", "");

const baseUrl = process.argv[2] || "https://www.vscs-bg.com";

const response = await fetch(`${baseUrl}/api/apply`, {
  method: "POST",
  body: form,
});

const text = await response.text();
console.log(`Status: ${response.status}`);
console.log(text);
