/**
 * Integration module for AnimeKai and AniKoto sites
 * 
 * This module integrates the AnimeKaiScraper with the existing aniwatch-api structure
 */

const { AnimeKaiScraper, Servers } = require('./animekai');

// Create a router function similar to the original hianime.ts
function createAnimeKaiRouter(app) {
  const animekai = new AnimeKaiScraper();
  
  // /api/v2/animekai
  app.get("/api/v2/animekai", (req, res) => {
    res.redirect("/", 301);
  });
  
  // /api/v2/animekai/home
  app.get("/api/v2/animekai/home", async (req, res) => {
    try {
      const data = await animekai.getHomePage();
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error fetching home page:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // /api/v2/animekai/search?q={query}&page={page}
  app.get("/api/v2/animekai/search", async (req, res) => {
    try {
      const query = req.query.q || "";
      const page = parseInt(req.query.page) || 1;
      const filters = { ...req.query };
      delete filters.q;
      delete filters.page;
      
      const data = await animekai.search(query, page, filters);
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error searching:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // /api/v2/animekai/anime/{animeId}
  app.get("/api/v2/animekai/anime/:animeId", async (req, res) => {
    try {
      const animeId = req.params.animeId;
      const data = await animekai.getInfo(animeId);
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error getting anime info:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // /api/v2/animekai/anime/{animeId}/episodes
  app.get("/api/v2/animekai/anime/:animeId/episodes", async (req, res) => {
    try {
      const animeId = req.params.animeId;
      const data = await animekai.getEpisodes(animeId);
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error getting episodes:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // /api/v2/animekai/episode/servers?animeEpisodeId={id}
  app.get("/api/v2/animekai/episode/servers", async (req, res) => {
    try {
      const animeEpisodeId = req.query.animeEpisodeId || "";
      const data = await animekai.getEpisodeServers(animeEpisodeId);
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error getting episode servers:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // /api/v2/animekai/episode/sources?animeEpisodeId={id}?server={server}&category={category}
  app.get("/api/v2/animekai/episode/sources", async (req, res) => {
    try {
      const animeEpisodeId = req.query.animeEpisodeId || "";
      const server = req.query.server || Servers.VidStreaming;
      const category = req.query.category || "sub";
      
      const data = await animekai.getEpisodeSources(animeEpisodeId, server, category);
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error getting episode sources:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // Add more endpoints as needed
  
  return app;
}

// Create a router function for AniKoto that redirects to AnimeKai
function createAniKotoRouter(app) {
  // /api/v2/anikoto
  app.get("/api/v2/anikoto", (req, res) => {
    res.redirect("/api/v2/animekai", 301);
  });
  
  // /api/v2/anikoto/home
  app.get("/api/v2/anikoto/home", (req, res) => {
    res.redirect("/api/v2/animekai/home", 301);
  });
  
  // /api/v2/anikoto/search
  app.get("/api/v2/anikoto/search", (req, res) => {
    res.redirect(`/api/v2/animekai/search?${new URLSearchParams(req.query).toString()}`, 301);
  });
  
  // /api/v2/anikoto/anime/{animeId}
  app.get("/api/v2/anikoto/anime/:animeId", (req, res) => {
    res.redirect(`/api/v2/animekai/anime/${req.params.animeId}`, 301);
  });
  
  // /api/v2/anikoto/anime/{animeId}/episodes
  app.get("/api/v2/anikoto/anime/:animeId/episodes", (req, res) => {
    res.redirect(`/api/v2/animekai/anime/${req.params.animeId}/episodes`, 301);
  });
  
  // /api/v2/anikoto/episode/servers
  app.get("/api/v2/anikoto/episode/servers", (req, res) => {
    res.redirect(`/api/v2/animekai/episode/servers?${new URLSearchParams(req.query).toString()}`, 301);
  });
  
  // /api/v2/anikoto/episode/sources
  app.get("/api/v2/anikoto/episode/sources", (req, res) => {
    res.redirect(`/api/v2/animekai/episode/sources?${new URLSearchParams(req.query).toString()}`, 301);
  });
  
  // Add more redirects as needed
  
  return app;
}

module.exports = {
  createAnimeKaiRouter,
  createAniKotoRouter
};
