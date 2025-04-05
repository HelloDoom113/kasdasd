      },
      {...}
    ]
  }
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Anime Episode Streaming Links

</summary>

#### Endpoint

```sh
/api/v2/hianime/episode/sources?animeEpisodeId={id}?server={server}&category={dub || sub || raw}
```

#### Query Parameters

|    Parameter     |  Type  |                     Description                      | Required? | Default  |
| :--------------: | :----: | :--------------------------------------------------: | :-------: | :------: |
| `animeEpisodeId` | string |             The unique anime episode id.             |    Yes    |    --    |
|     `server`     | string |               The name of the server.                |    No     | `"hd-1"` |
|    `category`    | string | The category of the episode ('sub', 'dub' or 'raw'). |    No     | `"sub"`  |

#### Request Sample

```javascript
const resp = await fetch(
  "/api/v2/hianime/episode/sources?animeEpisodeId=steinsgate-3?ep=230&server=hd-1&category=dub"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
    headers: {
      Referer: string,
      "User-Agent": string,
      ...
    },
    sources: [
      {
        url: string, // .m3u8 hls streaming file
        isM3U8: boolean,
        quality?: string,
      },
      {...}
    ],
    subtitles: [
      {
        lang: "English",
        url: string, // .vtt subtitle file
      },
      {...}
    ],
    anilistID: number | null,
    malID: number | null
  }
}
```

[🔼 Back to Top](#table-of-contents)

</details>

## <span id="development">👨‍💻 Development</span>

Pull requests and stars are always welcome. If you encounter any bug or want to add a new feature to this api, consider creating a new [issue](https://github.com/ghoshRitesh12/aniwatch-api/issues). If you wish to contribute to this project, read the [CONTRIBUTING.md](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/CONTRIBUTING.md) file.

## <span id="contributors">✨ Contributors</span>

Thanks to the following people for keeping this project alive and relevant.

[![](https://contrib.rocks/image?repo=ghoshRitesh12/aniwatch-api)](https://github.com/ghoshRitesh12/aniwatch-api/graphs/contributors)

## <span id="thanks">🤝 Thanks</span>

- [consumet.ts](https://github.com/consumet/consumet.ts)
- [api.consumet.org](https://github.com/consumet/api.consumet.org)

## <span id="support">🙌 Support</span>

Don't forget to leave a star 🌟. You can also follow me on X (Twitter) [@riteshgsh](https://x.com/riteshgsh).

## <span id="license">📜 License</span>

This project is licensed under the [MIT License](https://opensource.org/license/mit/) - see the [LICENSE](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/LICENSE) file for more details.

<br/>

## <span id="star-history">🌟 Star History</span>

<img
  id="star-history" 
  src="https://starchart.cc/ghoshRitesh12/aniwatch-api.svg?variant=adaptive"
  alt=""
/>
