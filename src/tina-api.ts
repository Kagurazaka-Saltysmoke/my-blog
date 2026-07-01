const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.CF_PAGES_BRANCH ||
  process.env.HEAD ||
  'main';

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '';
const token = process.env.TINA_TOKEN || '';

const API_URL = clientId
  ? `https://content.tinajs.io/2.4/content/${clientId}/github/${branch}`
  : 'http://localhost:4001/graphql';

interface GQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export async function tinaRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<GQLResponse<T>> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'X-API-KEY': token } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

// Post list query
export async function getPosts() {
  const { data, errors } = await tinaRequest<{
    postConnection: {
      totalCount: number;
      edges?: Array<{
        node?: {
          id: string;
          title: string;
          description: string;
          publishedAt?: string;
          updatedAt?: string;
          tags?: Array<string | null> | null;
          draft?: boolean;
          image?: string;
          body?: unknown;
          _sys: { filename: string; relativePath: string };
        } | null;
      } | null> | null;
    };
  }>(`
    query PostConnection($sort: String, $filter: PostFilter) {
      postConnection(sort: $sort, filter: $filter) {
        totalCount
        edges {
          node {
            id
            title
            description
            publishedAt
            updatedAt
            tags
            draft
            image
            _sys { filename relativePath }
          }
        }
      }
    }
  `, { sort: 'publishedAt', filter: { draft: { eq: false } } });

  if (errors?.length) throw new Error(errors[0].message);
  return data?.postConnection.edges?.map((e) => e?.node).filter(Boolean) ?? [];
}

// Single post query
export async function getPost(relativePath: string) {
  const { data, errors } = await tinaRequest<{
    post: {
      id: string;
      title: string;
      description: string;
      publishedAt?: string;
      updatedAt?: string;
      tags?: Array<string | null> | null;
      draft?: boolean;
      image?: string;
      body?: unknown;
      _sys: { filename: string; relativePath: string };
    } | null;
  }>(`
    query Post($relativePath: String!) {
      post(relativePath: $relativePath) {
        id
        title
        description
        publishedAt
        updatedAt
        tags
        draft
        image
        body
        _sys { filename relativePath }
      }
    }
  `, { relativePath });

  if (errors?.length) throw new Error(errors[0].message);
  return data?.post ?? null;
}
