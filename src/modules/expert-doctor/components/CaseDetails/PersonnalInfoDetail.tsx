import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { PersonalInfo } from '../../../../entities/PersonalInfo'

const Container = styled.div`
  width: 300px;
`

export const PersonnalInfoDetail = ({
  personnal,
}: {
  personnal: PersonalInfo
}) => {
  return (
    <Container>
      <Typography variant='body1' gutterBottom>
        <b>Sex: </b> {personnal.sex === 'M' ? 'Male' : 'Female'} <br />
        <b>Age: </b> {personnal.age} year(s) old <br />
        <b>Civil status: </b> {personnal.civil_status} <br />
        <b>Profession: </b> {personnal.profession} <br />
        <b>N° of children: </b> {personnal.nb_child} <br />
        <b>Blood group: </b> {personnal.blood_group} <br />
      </Typography>
    </Container>
  )
}
