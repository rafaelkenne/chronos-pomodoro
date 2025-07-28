import { useEffect } from 'react';
import { Container } from '../../../Container';
import { CountDown } from '../../../CountDown';
import { Form } from '../../../Form';
import { MainTemplate } from '../../MainTemplate';

function Home() {
  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  }, []);
  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <Form />
      </Container>
    </MainTemplate>
  );
}

export { Home };
