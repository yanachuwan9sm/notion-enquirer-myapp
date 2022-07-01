import fetcher, { NotionQueryType } from './api/fetcher';
import { getTomorrowDateYYYYMMDD } from './utils/dateFormat';

//　明日の日付に登録されたデータのみを取得するクエリ
const tomorrowTaskQuery = {
  filter: {
    property: 'Deadline',
    date: {
      equals: getTomorrowDateYYYYMMDD(),
    },
  },
};

const tomorrowTaskAction = {
  name: 'todayTaskAction',
  type: 'select',
  message: '========== 明日のタスク一覧 ==========',
  choices: '',
};

// 明日のタスクのみを、選択肢として表示する形に整形し、コマンドの選択肢にセットする
const setTomorrowTask = (results: any) => {
  const result = results.map((result: any) => {
    return result.properties.Name.title
      .map((titleProperty: any) => {
        return titleProperty.text.content;
      })
      .join('');
  });

  // 選択肢にタスクをセットする
  tomorrowTaskAction.choices = result;
};

// 明日の日付と一致するタスクをAPIより取得する
const getTomorrowTaskFetcher = async (data: any) => {
  await fetcher
    .post(`databases/${process.env.NOTION_TASK_DATABASE_ID}/query/`, data)
    .then((data) => {
      setTomorrowTask(data.results);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default async function getTomorrowTask() {
  await getTomorrowTaskFetcher(tomorrowTaskQuery);

  return tomorrowTaskAction;
}
