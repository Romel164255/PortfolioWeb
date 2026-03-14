import express from "express";

const router = express.Router();

async function safeFetch(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      return { error: "service unavailable" };
    }

    return await res.json();
  } catch {
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
