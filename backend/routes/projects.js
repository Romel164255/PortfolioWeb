import express from "express";

const router = express.Router();

/* ---------- GET PROJECT STATS ---------- */
router.get("/stats", async (req, res) => {
  try {

    const [rchatRes, shortenerRes, ecommerceRes] = await Promise.all([
      fetch("https://chatty-phi-ten.vercel.app/api/stats"),
      fetch("https://url-shortener-taupe-gamma.vercel.app/api/stats"),
      fetch("https://e-commerce-hazel-chi.vercel.app/api/stats")
    ]);

    const rchat = await rchatRes.json();
    const shortener = await shortenerRes.json();
    const ecommerce = await ecommerceRes.json();

    res.json({
      rchat,
      shortener,
      ecommerce
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch project stats" });
  }
});

export default router;