const url = "https://typical-basket-fa0eaf0a45.strapiapp.com/_health";

async function testHealth() {
  try {
    console.log("Checking health:", url);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    console.log("Status:", res.status);
    console.log("OK:", res.ok);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Fetch timed out");
    } else {
      console.error("Fetch failed:", error);
      if (error.cause) console.error("Cause:", error.cause);
    }
  }
}

testHealth();
