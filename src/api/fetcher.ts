const fetch = require('node-fetch');

const apiKey = process.env.NOTION_API_KEY ? process.env.NOTION_API_KEY : '';

export type NotionQueryType = {
  filter?: {
    [key: string]: string;
  };
  sorts?: {
    [key: string]: string;
  };
};

const fetcher = {
  get: async (url: string) => {
    const response = await fetch(`https://api.notion.com/v1/${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Notion-Version': '2022-02-22',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
    return await response.json();
  },

  post: async (url: string, data: any) => {
    const response = await fetch(`https://api.notion.com/v1/${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Notion-Version': '2022-02-22',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
    return await response.json();
  },

  patch: async (url: string, data: any) => {
    const response = await fetch(`https://api.notion.com/v1/${url}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Notion-Version': '2022-02-22',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err);
    }
    return await response.json();
  },
};

export default fetcher;
