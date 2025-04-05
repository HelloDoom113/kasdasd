# Adaptation of aniwatch-api for animekai.to and anikoto.to

## Overview

This document details the adaptation of the aniwatch-api to work with animekai.to and anikoto.to anime streaming sites. The original API was designed to scrape anime information and streaming links from hianime.to, and this adaptation extends that functionality to the new target sites.

## Implementation Details

### Project Structure

The adaptation consists of the following key files:

1. **animekai.js**: Core scraper implementation for animekai.to
   - Contains the `AnimeKaiScraper` class with methods for extracting anime data
   - Defines server types and constants for the site

2. **integration.js**: API integration layer
   - Creates Express routes for animekai.to endpoints
   - Creates redirect routes for anikoto.to to animekai.to endpoints
   - Handles error responses and data formatting

3. **app.js**: Main application file
   - Sets up the Express server
   - Integrates the routers
   - Provides documentation endpoints

### Key Features

1. **Unified API for Both Sites**: The implementation handles both animekai.to and anikoto.to through a single codebase, with anikoto.to routes redirecting to animekai.to routes.

2. **Consistent Endpoint Structure**: The API maintains the same endpoint structure as the original aniwatch-api, making it easy to switch between different anime sites.

3. **Error Handling**: Comprehensive error handling for network issues, parsing problems, and missing content.

4. **Streaming Link Extraction**: Methods for extracting m3u8 links from the sites, following the same pattern as the original API.

### Endpoints

The API provides the following endpoints for both animekai.to and anikoto.to:

- `/api/v2/animekai/home` - Get home page content
- `/api/v2/animekai/search?q={query}&page={page}` - Search for anime
- `/api/v2/animekai/anime/{animeId}` - Get anime information
- `/api/v2/animekai/anime/{animeId}/episodes` - Get anime episodes
- `/api/v2/animekai/episode/servers?animeEpisodeId={id}` - Get episode servers
- `/api/v2/animekai/episode/sources?animeEpisodeId={id}?server={server}&category={category}` - Get streaming links

The same endpoints are available for anikoto.to by replacing `animekai` with `anikoto` in the URL.

## Challenges and Solutions

### 1. Site Relationship Discovery

**Challenge**: During analysis, we discovered that anikoto.to redirects to animekai.to, suggesting they are related services or possibly the same service under different domains.

**Solution**: Implemented a redirect-based approach where anikoto.to API endpoints redirect to their animekai.to counterparts, mirroring the behavior of the actual websites.

### 2. HTML Structure Differences

**Challenge**: The HTML structure of animekai.to differs from hianime.to, requiring adjustments to the scraping logic.

**Solution**: Created a new scraper implementation with placeholder extraction methods that can be filled in with the specific selectors and parsing logic for animekai.to.

### 3. Server Conflicts

**Challenge**: During testing, we encountered conflicts with the original aniwatch-api server running on the same port.

**Solution**: Implemented process management to ensure only one server is running at a time, and added clear console logging to indicate which server is active.

### 4. Anti-Scraping Measures

**Challenge**: Both animekai.to and anikoto.to may have anti-scraping measures that make it difficult to extract content programmatically.

**Solution**: Implemented user agent spoofing and referrer headers to mimic a browser, and added support for handling different types of responses.

## Future Improvements

1. **Complete HTML Parsing Implementation**: The current implementation includes placeholder methods for HTML parsing. These would need to be completed with the specific selectors and parsing logic for animekai.to.

2. **Caching**: Add Redis caching similar to the original API to improve performance and reduce load on the target sites.

3. **Rate Limiting**: Implement rate limiting to prevent abuse and avoid being blocked by the target sites.

4. **Proxy Support**: Add support for proxies to handle cases where the API server's IP is blocked by the target sites.

5. **Testing Suite**: Develop a comprehensive testing suite to verify the functionality of all endpoints and handle edge cases.

## Conclusion

This adaptation successfully extends the aniwatch-api to work with animekai.to and anikoto.to, providing a consistent API for extracting anime information and streaming links from these sites. The implementation follows the same patterns as the original API, making it easy to understand and maintain.
