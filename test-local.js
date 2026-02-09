const url = "http://localhost:1337/_health";

async function testLocal() {
  try {
    console.log("Checking local health:", url);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    console.log("Status:", res.status);
    console.log("OK:", res.ok);
  } catch (error) {
    console.error("Local fetch failed:", error.message);
  }
}

testLocal();
