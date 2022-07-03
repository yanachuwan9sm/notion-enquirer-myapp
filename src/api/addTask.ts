import { getNowDateYYYYMMDD } from '../utils/dateFormat';
import fetcherAsync from './fetcherAsync';

// データ行の名前を元に更新したいページの ID を取得
export const addTaskFetcher = async (taskName: string) => {
  const addPageQuery = {
    parent: {
      database_id: process.env.NOTION_TASK_DATABASE_ID,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: taskName,
            },
          },
        ],
      },
      Deadline: {
        date: {
          start: getNowDateYYYYMMDD(),
          end: null,
          time_zone: null,
        },
      },
    },
  };

  const result = await fetcherAsync<any, object>(`pages`, `post`, addPageQuery);

  return result;
};
