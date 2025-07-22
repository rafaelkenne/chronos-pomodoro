import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './TaskReducer';
import { TimerWorkerManager } from '../../workers/timerWorkerManager';
import { TaskActionTypes } from './TaskAction';
import { loadBeep } from '../../utils/loadBeep';
import { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state');
    if (storageState === null) return initialTaskState;
    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    return { ...parsedStorageState, activeTask: null, secondsRemaining: 0, formattedSecondsRemaining: '00:00' };
  });

  const playBeepRef = useRef<() => void | null>(null);

  const worker = TimerWorkerManager.getInstance();
  worker.onmessage(e => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        console.log('tocando audio...');

        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    //Estado mudou
    localStorage.setItem('state', JSON.stringify(state));

    if (state.activeTask && playBeepRef.current === null) {
      //console.log('carregando audio...');

      playBeepRef.current = loadBeep();
    } else {
      //console.log('zerando audio');

      playBeepRef.current = null;
    }
  }, [state.activeTask, state]);

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
}
