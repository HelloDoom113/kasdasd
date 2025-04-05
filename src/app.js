/**
 * Main application file for the adapted API
 * 
 * This file integrates the AnimeKai and AniKoto scrapers with the existing aniwatch-api structure
 */

const express = require('express');
const cors = require('cors');
const { createAnimeKaiRouter, createAniKotoRouter } = require('./integration');

// Create Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Add routers
createAnimeKaiRouter(app);
createAniKotoRouter(app);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Anime API Adaptation for AnimeKai and AniKoto',
    endpoints: {
      animekai: {
        home: '/api/v2/animekai/home',
        search: '/api/v2/animekai/search?q={query}&page={page}',
        anime: '/api/v2/animekai/anime/{animeId}',
        episodes: '/api/v2/animekai/anime/{animeId}/episodes',
        servers: '/api/v2/animekai/episode/servers?animeEpisodeId={id}',
        sources: '/api/v2/animekai/episode/sources?animeEpisodeId={id}?server={server}&category={category}'
      },
      anikoto: {
        home: '/api/v2/anikoto/home',
        search: '/api/v2/anikoto/search?q={query}&page={page}',
        anime: '/api/v2/anikoto/anime/{animeId}',
        episodes: '/api/v2/anikoto/anime/{animeId}/episodes',
        servers: '/api/v2/anikoto/episode/servers?animeEpisodeId={id}',
        sources: '/api/v2/anikoto/episode/sources?animeEpisodeId={id}?server={server}&category={category}'
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`AnimeKai/AniKoto API adaptation running on port ${PORT}`);
});

module.exports = app;
