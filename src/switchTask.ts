import fetcher, { NotionQueryType } from './api/fetcher';
import { getPageIdFetcher } from './api/getPageId';

// TODO

// データ行のタスク進行度を表すチェックボックスの値を切り替える
const switchTaskCheckboxFetcher = async (pageId: string, isDone: boolean) => {
  await fetcher
    .patch(`pages/${pageId}`, {
      properties: {
        Done: {
          checkbox: !isDone,
        },
      },
    })
    .then((data) => {
      console.log('success : taskの進行状況の変更に成功しました');
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function switchTask(data: any) {
  data.todayTaskAction.map(async (choice: string) => {
    // これだと空文字列が全て消えてしまう
    // const taskName = choice.replace(/\s+/g, '').slice(1);
    const taskName = choice.slice(2);

    const res = await getPageIdFetcher(taskName);

    if (res.error) {
      throw new Error(res.error);
    } else {
      const pageId = res.results[0].id;
      const isDone = res.results[0].properties.Done.checkbox;

      switchTaskCheckboxFetcher(pageId, isDone);
    }
  });
}
