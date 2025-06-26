import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DeafultButton';
import { DefaultInput } from '../DeafultInput';
import styles from './styles.module.css';
import { useRef } from 'react';
import { TaskModel } from '../../models/TaskModels';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function Form() {
  const { setState } = useTaskContext();

  // const [taskName, setTaskName] = useState('');
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      alert('Digite o nome da tarefa!');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now.toString(),
      name: taskName,
      starDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: 1,
      type: 'workTime',
    };
    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: 1, //conferir
        secondsRemaining: secondsRemaining, //conferir
        formattedSecondsRemaining: '00:00', //conferir
        tasks: [...prevState.tasks, newTask],
      };
    });
  }
  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action='#'>
      <div className='formRow'>
        <DefaultInput
          labelText='Task'
          id='meuInput'
          type='text'
          placeholder='Digite Algo'
          ref={taskNameInput}
          // value={taskName}
          // onChange={e => setTaskName(e.target.value)}
        />
      </div>

      <div className={styles.formRow}>
        <p>Próximo intervalo é de 25 min</p>
      </div>

      <div className={styles.formRow}>
        <Cycles />
      </div>

      <div className={styles.formRow}>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
