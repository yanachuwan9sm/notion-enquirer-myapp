import {
  getNowDateYYYYMMDD,
  getTomorrowDateYYYYMMDD,
} from '../utils/dateFormat';
import fetcherAsync from './fetcherAsync';

// 今日の日付と一致するタスクをAPIより取得する
export const getTodayTaskFetcher = async () => {
  //　今日の日付に登録されたデータのみを取得するクエリ
  const todayTaskQuery = {
    filter: {
      property: 'Deadline',
      date: {
        equals: getNowDateYYYYMMDD(),
      },
    },
  };

  const result = await fetcherAsync<any, object>(
    `databases/${process.env.NOTION_TASK_DATABASE_ID}/query/`,
    `post`,
    todayTaskQuery
  );

  return result;
};

// 明日の日付と一致するタスクをAPIより取得する
export const getTomorrowTaskFetcher = async () => {
  //　明日の日付に登録されたデータのみを取得するクエリ
  const tomorrowTaskQuery = {
    filter: {
      property: 'Deadline',
      date: {
        equals: getTomorrowDateYYYYMMDD(),
      },
    },
  };

  const result = await fetcherAsync<any, object>(
    `databases/${process.env.NOTION_TASK_DATABASE_ID}/query/`,
    `post`,
    tomorrowTaskQuery
  );

  return result;
};
