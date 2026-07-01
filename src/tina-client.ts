import { createClient } from 'tinacms/dist/client';
import { queries } from '../tina/__generated__/types';

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.CF_PAGES_BRANCH ||
  process.env.HEAD ||
  'main';

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '';

const isLocal =
  process.env.TINA_PUBLIC_IS_LOCAL === 'true' ||
  !process.env.TINA_TOKEN;

const url = isLocal
  ? 'http://localhost:4001/graphql'
  : `https://content.tinajs.io/content/${clientId}/github/${branch}`;

const token = isLocal ? 'placeholder' : process.env.TINA_TOKEN || '';

export const client = createClient({ url, token, queries });
export default client;
