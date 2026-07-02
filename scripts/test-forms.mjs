const baseUrl = process.argv[2] || "http://localhost:3000";

async function testJsonForm(name, path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  console.log(`${name}: ${response.status} ${text}`);
}

async function testApplyForm() {
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

  const response = await fetch(`${baseUrl}/api/apply`, {
    method: "POST",
    body: form,
  });
  const text = await response.text();
  console.log(`Apply: ${response.status} ${text}`);
}

console.log(`Testing forms at ${baseUrl}\n`);

await testJsonForm("Contact", "/api/contact", {
  name: "Test User",
  email: "test@example.com",
  message: "Automated form test",
  _gotcha: "",
});

await testJsonForm("Consultation", "/api/consultation", {
  source: "page",
  name: "Test User",
  email: "test@example.com",
  phone: "+359888000000",
  _gotcha: "",
});

await testApplyForm();
