import styled from '@emotion/styled'
import { MessageType } from '..'
import { PRIMARY } from '../../../../../shared/colors'

const MessageContainer = styled.div`
  min-width: 40%;
  color: white;
  max-width: 50%;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: ${PRIMARY};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  p {
    margin: 0;
  }
`

const Container = styled.div`
  > p {
    font-size: 12px;
    margin: 0px;
  }

  > .date {
    max-width: 55%;
    display: flex;
    justify-content: flex-end;

    > p {
      font-size: 9px;
      margin-top: 0px;
    }
  }
`

export const RecieverMessage = ({ message }: { message: MessageType }) => {
  return (
    <Container>
      <p>Patient</p>
      <MessageContainer>
        <p>{message.message}</p>
      </MessageContainer>
      <div className='date'>
        <p>{message.date.toUTCString()}</p>
      </div>
    </Container>
  )
}
