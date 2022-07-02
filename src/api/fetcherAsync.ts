const fetch = require('node-fetch');

const apiKey: string = process.env.NOTION_API_KEY || '';

type methodType = 'get' | 'head' | 'post' | 'patch' | 'put';

const fetcherAsync = async <T, B>(
  url: string,
  method: methodType,
  body: B | undefined = undefined
): Promise<T | { error: any }> => {
  try {
    const res = await fetch(`https://api.notion.com/v1/${url}`, {
      method: method.toUpperCase(),
      headers: {
        Accept: 'application/json',
        'Notion-Version': '2022-02-22',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: typeof body === 'object' ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const error = await res.json();
      return { error: error.code };
    }
    return await res.json();
  } catch (err) {
    return { error: err };
  }
};

export default fetcherAsync;
