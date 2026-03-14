import api from "./api";

/**
 * Fetches live stats from all three projects via the backend aggregator.
 * Endpoint: GET /api/projects/stats
 * Returns: { rchat, shortener, ecommerce }
 */
export const getProjectStats = () =>
  api.get("/api/projects/stats");
