import fetcherAsync from './fetcherAsync';

// データ行の名前を元に更新したいページの ID を取得
export const getPageIdFetcher = async (taskName: string) => {
  const pageIdFilterQuery = {
    filter: {
      and: [
        {
          property: 'Name',
          title: {
            equals: taskName,
          },
        },
      ],
    },
  };

  const result = await fetcherAsync<any, object>(
    `databases/${process.env.NOTION_TASK_DATABASE_ID}/query/`,
    `post`,
    pageIdFilterQuery
  );

  return result;
};
