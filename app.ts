import getTomorrowTask from './src/tomorrowTaskAction';
import getTodayTask from './src/todayTaskAction';
import switchTask from './src/switchTask';
import addTask from './src/addTodayTask';

const Enquirer = require('enquirer');
const { Input } = require('enquirer');

(async () => {
  const rootAction = {
    name: 'rootAction',
    type: 'select',
    message: '========== タスクを選択してください ==========',
    choices: ['今日のタスクを表示', '今日のタスクを追加', '明日のタスクを表示'],
  };

  const answer = await Enquirer.prompt(rootAction);
  console.log(answer.rootAction);

  if (answer.rootAction === '今日のタスクを表示') {
    const result = await getTodayTask();
    const answer = await Enquirer.prompt(result);
    switchTask(answer);
  } else if (answer.rootAction === '明日のタスクを表示') {
    const result = await getTomorrowTask();
    const answer = await Enquirer.prompt(result);
  } else if (answer.rootAction === '今日のタスクを追加') {
    const prompt = new Input({
      message: '追加するタスクのタイトル名を入力してください',
      initial: 'new task',
    });
    prompt
      .run()
      .then((answer: any) => addTask(answer))
      .catch(console.log);
  }
})();
