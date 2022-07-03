import { addTaskFetcher } from './api/addTask';

export default async function addTask(taskName: string) {
  const res = await addTaskFetcher(taskName);

  if (res.error) {
    throw new Error(res.error);
  } else {
    console.log(`${taskName} をタスクに追加しました`);
  }
}
