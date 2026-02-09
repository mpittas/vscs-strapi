const remoteUrl =
  "https://typical-basket-fa0eaf0a45.strapiapp.com/api/projects?locale=bg";
const localUrl = "http://localhost:1337/api/projects?locale=bg";

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function checkProjects() {
  console.log("--- Checking Remote API ---");
  try {
    const res = await fetchWithTimeout(remoteUrl);
    if (res.ok) {
      const json = await res.json();
      console.log(`Remote: Found ${json.data.length} projects.`);
      json.data.forEach((p) =>
        console.log(` - [${p.id}] ${p.attributes?.title || p.title}`),
      );
    } else {
      console.log(`Remote Error: ${res.status}`);
    }
  } catch (e) {
    console.log("Remote Unreachable:", e.message);
  }

  console.log("\n--- Checking Local API ---");
  try {
    const res = await fetchWithTimeout(localUrl);
    if (res.ok) {
      const json = await res.json();
      console.log(`Local: Found ${json.data.length} projects.`);
      json.data.forEach((p) =>
        console.log(` - [${p.id}] ${p.attributes?.title || p.title}`),
      );
    } else {
      console.log(`Local Error: ${res.status}`);
    }
  } catch (e) {
    console.log("Local Unreachable:", e.message);
  }
}

checkProjects();
