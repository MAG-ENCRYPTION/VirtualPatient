import styled from '@emotion/styled'
import logo404 from '../../assets/images/404.svg'
import { PRIMARY } from '../../shared/colors'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;

  .not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    padding-top: 0;
    margin: 0;
    height: 450px;
    width: 550px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .not-found p {
    font-size: 18px;
    text-align: center;
  }

  .not-found .line {
    background-color: ${PRIMARY};
    width: 100%;
    height: 10px;
    margin-bottom: 10px;
  }

  .not-found .line2 {
    background-color: #0044ffef;
    width: 100%;
    height: 5px;
    margin-bottom: 10px;
  }
`

export const PageNotFound = () => {
  return (
    <Container>
      <div className='box-shadow not-found'>
        <div className='line'></div>
        <h2>Page Not Found </h2>

        <img
          src={logo404}
          width={300}
          style={{ objectFit: 'cover' }}
          alt='not-found'
        />
        <p>The resource you requested is not available!</p>
      </div>
    </Container>
  )
}
