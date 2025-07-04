import { TaskStateModel } from '../../models/TaskStateModel';
import { TaskActionModel, TaskActionTypes } from './TaskAction';

export function taskReducer(state: TaskStateModel, action: TaskActionModel) {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      return state;
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return state;
    }
    case TaskActionTypes.RESET_STATE: {
      return state;
    }
  }

  //SEMPRE DEVE RETORNAR O ESTADO
  return state;
}
