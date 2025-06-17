import { TaskModel } from './TaskModels';

export type TaskStateModel = {
  tasks: TaskModel[]; // historico, form
  secondsRemaining: number; // countdown, historico, form, button
  formattedSecondsRemaining: string; //titulo countdown
  activeTask: TaskModel | null; // countdown, historico, form, button
  currentCycle: number; //home
  config: {
    workTime: number; //form
    shortBreakTime: number; //form
    longBreakTime: number; //form
  };
};
