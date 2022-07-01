import fetcher, { NotionQueryType } from './api/fetcher';
import { getNowDateYYYYMMDD } from './utils/dateFormat';

//　今日の日付に登録されたデータのみを取得するクエリ
const todayTaskQuery = {
  filter: {
    property: 'Deadline',
    date: {
      equals: getNowDateYYYYMMDD(),
    },
  },
};

const todayTaskAction = {
  name: 'todayTaskAction',
  type: 'select',
  multiple: true,
  message: '========== 本日のタスク一覧 ==========',
  choices: '',
};

// 今日のタスクのみを、選択肢として表示する形で表示する
const setTodayTask = (results: any) => {
  const result = results.map((result: any) => {
    let doneFrag = false;

    if (result.properties.Done.checkbox) {
      doneFrag = !doneFrag;
    }

    return result.properties.Name.title
      .map((titleProperty: any) => {
        return doneFrag
          ? `✅ ${titleProperty.text.content}`
          : `❌ ${titleProperty.text.content}`;
      })
      .join('');
  });
  todayTaskAction.choices = result;
};

// 今日の日付と一致するタスクをAPIより取得する
const getTodayTaskFetcher = async (data: any) => {
  await fetcher
    .post(`databases/${process.env.NOTION_TASK_DATABASE_ID}/query/`, data)
    .then((data) => {
      setTodayTask(data.results);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default async function getTodayTask() {
  await getTodayTaskFetcher(todayTaskQuery);

  return todayTaskAction;
}
