const url =
  "https://typical-basket-fa0eaf0a45.strapiapp.com/api/blog-posts?locale=bg";

async function testFetch() {
  try {
    console.log("Fetching:", url);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    console.log("Status:", res.status);
    console.log("OK:", res.ok);
    const text = await res.text();
    console.log("Body length:", text.length);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Fetch timed out after 30s");
    } else {
      console.error("Fetch failed:", error);
      if (error.cause) console.error("Cause:", error.cause);
    }
  }
}

testFetch();
