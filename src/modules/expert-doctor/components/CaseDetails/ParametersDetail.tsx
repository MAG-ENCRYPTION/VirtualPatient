import styled from '@emotion/styled'
import { Divider, Typography } from '@mui/material'
import { MedicalParameter } from '../../../../entities/MedicalParameter'

const Container = styled.div`
  width: 300px;
`

export const ParametersDetail = ({
  parameters,
}: {
  parameters: MedicalParameter[]
}) => {
  return (
    <Container>
      <Typography variant='body1' gutterBottom>
        {parameters.map((param) => (
          <span key={param.id}>
            <b>
              {param.type_parameter.name} ({param.type_parameter.unit}):{' '}
            </b>{' '}
            {param.value}
            <br />
            <b>Comment: </b> {param.comment || '----'}
            <Divider />
          </span>
        ))}
      </Typography>
    </Container>
  )
}
