import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: '/root/my-blog/tina/__generated__/.cache/1782925205662', url: 'https://content.tinajs.io/2.4/content/61b4d809-b154-4127-8481-4d419598b0bf/github/main', token: 'fc20b7a443778129b5f29818b437f4c29c6a814b', queries,  });
export default client;
  