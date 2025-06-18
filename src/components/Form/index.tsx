import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DeafultButton';
import { DefaultInput } from '../DeafultInput';
import styles from './styles.module.css';

export function Form() {
  return (
    <form className={styles.form} action='#'>
      <div className='formRow'>
        <DefaultInput labelText='Task' id='meuInput' type='text' placeholder='Digite Algo' />
      </div>

      <div className={styles.formRow}>
        <p>
          Próximo intervalo é de <h1>20 minutos</h1>
        </p>
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
