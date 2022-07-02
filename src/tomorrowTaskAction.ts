import { getTomorrowTaskFetcher } from './api/getTask';

// 明日のタスクのみを、選択肢として表示する形に整形し、コマンドの選択肢にセットする
const setTomorrowTask = (results: any) => {
  const result = results.map((result: any) => {
    return result.properties.Name.title
      .map((titleProperty: any) => {
        return titleProperty.text.content;
      })
      .join('');
  });

  return result;
};

export default async function getTomorrowTask() {
  const res = await getTomorrowTaskFetcher();

  if (res.error) {
    throw new Error(res.error);
  } else {
    const choices = setTomorrowTask(res.results);

    return {
      name: 'todayTaskAction',
      type: 'select',
      message: '========== 明日のタスク一覧 ==========',
      choices: choices,
    };
  }
}
