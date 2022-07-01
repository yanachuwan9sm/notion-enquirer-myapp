import fetcher, { NotionQueryType } from './api/fetcher';

// TODO
//
// getPageIdFetcherメソッドの名前と機能・責任範囲が少し異なっている => 設計の仕方を考える
// もう少しAPIを叩いてデータを取ってくる処理と他の処理を切り分けたい

// データ行の名前を元に更新したいページの ID を取得し、特定のページのタスク進行状態を切り替える
const getPageIdFetcher = async (taskName: string) => {
  await fetcher
    .post(`databases/${process.env.NOTION_TASK_DATABASE_ID}/query/`, {
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
    })
    .then((data) => {
      const pageId = data.results[0].id;
      const isDone = data.results[0].properties.Done.checkbox;

      switchTaskCheckboxFetcher(pageId, isDone);
    })
    .catch((error) => {
      console.log(error);
    });
};

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
  data.todayTaskAction.map((choice: string) => {
    // これだと空文字列が全て消えてしまう
    // const taskName = choice.replace(/\s+/g, '').slice(1);
    const taskName = choice.slice(2);
    getPageIdFetcher(taskName);
  });
}
