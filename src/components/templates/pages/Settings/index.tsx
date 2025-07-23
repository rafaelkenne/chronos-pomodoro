import { SaveIcon } from 'lucide-react';
import { Container } from '../../../Container';
import { DefaultButton } from '../../../DeafultButton';
import { DefaultInput } from '../../../DeafultInput';
import { Heading } from '../../../Heading';
import { MainTemplate } from '../../MainTemplate';
import { useRef } from 'react';
import { useTaskContext } from '../../../../contexts/TaskContext/useTaskContext';

function Settings() {
  const { state } = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const worktime = workTimeInputRef.current?.value;
    const shortBreakTime = shortBreakTimeInputRef.current?.value;
    const longBreakTime = longBreakTimeInputRef.current?.value;

    console.log(worktime, shortBreakTime, longBreakTime);
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curto e descanso longo
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} action='' className='form'>
          <div className='formRow'>
            <DefaultInput id='workTime' labelText='Foco' ref={workTimeInputRef} defaultValue={state.config.workTime} />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInputRef}
              defaultValue={state.config.shortBreakTime}
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='longoBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeInputRef}
              defaultValue={state.config.longBreakTime}
            />
          </div>
          <div className='formRow'>
            <DefaultButton icon={<SaveIcon />} aria-label='Salvar configurações' title='Salvar configurações' />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}

export { Settings };
