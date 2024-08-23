import styled from '@emotion/styled'
import { MessageType } from '..'

const SenderContainer = styled.div`
  min-width: 40%;
  max-width: 50%;
  padding: 10px;
  margin: 5px;
  margin-bottom: 0;
  border-radius: 10px;
  align-self: flex-end;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  p {
    margin: 0;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > .date {
    font-size: 9px;
    margin-right: 15px;
    align-self: flex-end;
  }
`

export const SenderMessage = ({ message }: { message: MessageType }) => {
  return (
    <Container>
      <SenderContainer>
        <p>{message.message}</p>
      </SenderContainer>
      <p className='date'>{message.date.toUTCString()}</p>
    </Container>
  )
}
