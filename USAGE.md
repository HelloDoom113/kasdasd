# Installation and Usage Guide

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/animekai-api-adaptation.git
cd animekai-api-adaptation
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The server will start on port 4000 by default. You can change this by setting the `PORT` environment variable.

## API Usage

### AnimeKai Endpoints

#### Get Home Page

```
GET /api/v2/animekai/home
```

Returns the home page content including trending anime, latest episodes, and popular anime.

#### Search Anime

```
GET /api/v2/animekai/search?q={query}&page={page}
```

Search for anime by title. Optional parameters:
- `page`: Page number (default: 1)
- Additional filters can be added as query parameters

#### Get Anime Information

```
GET /api/v2/animekai/anime/{animeId}
```

Returns detailed information about a specific anime.

#### Get Anime Episodes

```
GET /api/v2/animekai/anime/{animeId}/episodes
```

Returns a list of episodes for a specific anime.

#### Get Episode Servers

```
GET /api/v2/animekai/episode/servers?animeEpisodeId={id}
```

Returns available servers for a specific episode.

#### Get Episode Streaming Links

```
GET /api/v2/animekai/episode/sources?animeEpisodeId={id}?server={server}&category={category}
```

Returns streaming links (m3u8) for a specific episode.

Parameters:
- `animeEpisodeId`: The episode ID in the format `{animeId}?ep={episodeNumber}`
- `server`: Server name (default: "hd-1")
- `category`: Category (default: "sub", options: "sub", "dub", "raw")

### AniKoto Endpoints

AniKoto endpoints follow the same structure as AnimeKai endpoints, but with `/api/v2/anikoto/` instead of `/api/v2/animekai/`. All AniKoto endpoints redirect to their AnimeKai counterparts.

## Example Usage

### Get Home Page

```bash
curl http://localhost:4000/api/v2/animekai/home
```

### Search for Anime

```bash
curl http://localhost:4000/api/v2/animekai/search?q=one%20piece&page=1
```

### Get Anime Information

```bash
curl http://localhost:4000/api/v2/animekai/anime/one-piece-100
```

### Get Anime Episodes

```bash
curl http://localhost:4000/api/v2/animekai/anime/one-piece-100/episodes
```

### Get Episode Servers

```bash
curl http://localhost:4000/api/v2/animekai/episode/servers?animeEpisodeId=one-piece-100?ep=128589
```

### Get Episode Streaming Links

```bash
curl http://localhost:4000/api/v2/animekai/episode/sources?animeEpisodeId=one-piece-100?ep=128589&server=hd-1&category=sub
```

## Error Handling

The API returns JSON responses with the following structure:

```json
{
  "success": true,
  "data": { ... }
}
```

In case of an error:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Notes

- This API is for educational purposes only
- The content is not hosted by this API, it is scraped from animekai.to and anikoto.to
- Use responsibly and respect the terms of service of the target websites
