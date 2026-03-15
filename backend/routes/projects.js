import express from "express";

const router = express.Router();

async function safeFetch(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      return { error: "service unavailable", status: res.status };
    }

    const data = await res.json();

    // If the upstream itself returned an error object, surface it clearly
    if (data && data.error) {
      return { error: data.error, status: res.status };
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      return { error: "request timed out" };
    }
    return { error: "service unavailable" };
  }
}

router.get("/stats", async (req, res) => {
  try {

    const [rchat, shortener, ecommerce] = await Promise.all([
      safeFetch("https://chatty-phi-ten.vercel.app/api/stats"),
      safeFetch("https://url-shortener-taupe-gamma.vercel.app/api/stats"),
      safeFetch("https://e-commerce-hazel-chi.vercel.app/api/stats")
    ]);

    res.json({
      rchat,
      shortener,
      ecommerce
    });

  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Failed to fetch project stats" });
  }
});

export default router;
