import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DeafultButton';
import { DefaultInput } from '../DeafultInput';
import styles from './styles.module.css';
import { useState } from 'react';

export function Form() {
  const [taskName, setTaskName] = useState('');

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Deu certo!', taskName);
  }
  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} action='#'>
      <div className='formRow'>
        <DefaultInput
          labelText='Task'
          id='meuInput'
          type='text'
          placeholder='Digite Algo'
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
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
