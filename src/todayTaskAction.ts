import { getTodayTaskFetcher } from './api/getTask';

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

  return result;
};

export default async function getTodayTask() {
  const res = await getTodayTaskFetcher();

  if (res.error) {
    throw new Error(res.error);
  } else {
    const choices = setTodayTask(res.results);

    return {
      name: 'todayTaskAction',
      type: 'select',
      multiple: true,
      message: '========== 本日のタスク一覧 ==========',
      choices: choices,
    };
  }
}
