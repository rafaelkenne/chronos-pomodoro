import { TrashIcon } from 'lucide-react';
import { Container } from '../../../Container';
import { DefaultButton } from '../../../DeafultButton';
import { Heading } from '../../../Heading';
import { MainTemplate } from '../../MainTemplate';

import styles from './styles.module.css';
import { useTaskContext } from '../../../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../../../utils/formatDate';
import { getTaskStatus } from '../../../../utils/getTaskStatus';
import { sortTasks, SortTasksOptions } from '../../../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { TaskActionTypes } from '../../../../contexts/TaskContext/TaskAction';
import { showMessage } from '../../../../adapters/showMessage';
// import { toast } from 'react-toastify';
// import { Dialog } from '../../../Dialog';

function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setconfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;
  // const sortedTasks = sortTasks({ tasks: state.tasks });
  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(() => {
    return {
      tasks: sortTasks({ tasks: state.tasks }),
      field: 'startDate',
      direction: 'desc',
    };
  });

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;
    console.log('APAGAR HISTÓRICO');
    setconfirmClearHistory(false);
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';
    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    showMessage.confirm('Tem certeza que deseja excluir', confirmation => {
      setconfirmClearHistory(confirmation);
    });
    // if (!confirm('Tem certeza que deseja excluir?')) return;
    // dispatch({ type: TaskActionTypes.RESET_STATE });
    // toast.dismiss();
    // toast(Dialog, {
    //   data: 'Tem certeza que deseja excluir?',
    //   autoClose: false,
    //   closeOnClick: false,
    //   closeButton: false,
    //   draggable: false,
    //   onClose: confirmation => console.log(confirmation),
    // });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSortTasks({ field: 'name' })} className={styles.thSort}>
                    Tarefa
                  </th>
                  <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.thSort}>
                    Duração
                  </th>
                  <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.thSort}>
                    Data
                  </th>
                  <th className={styles.thSort}>Status</th>
                  <th className={styles.thSort}>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map(task => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  };
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && <p style={{ textAlign: 'center' }}>Ainda não existem tarefas criadas</p>}
      </Container>
    </MainTemplate>
  );
}

export { History };
