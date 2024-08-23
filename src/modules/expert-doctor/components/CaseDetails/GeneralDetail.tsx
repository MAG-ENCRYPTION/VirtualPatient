import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { ClinicalCase } from '../../../../entities/ClinicalCase'

const Container = styled.div`
  width: 300px;
`

export const GeneralDetail = ({
  clinicalCase,
}: {
  clinicalCase: ClinicalCase
}) => {
  return (
    <Container>
      <Typography variant='body1' gutterBottom>
        <b>Disease: </b> {clinicalCase.final_diagnosis} <br />
        <b>Patient's complain: </b> {clinicalCase.initial_problem}
        <br />
        <b>Speciality: </b> {clinicalCase.specialty}
        <br />
        <b> Difficulty: </b>
        {clinicalCase.difficulty}
        <br />
        <b> System: </b>
        {clinicalCase.system}
        <br />
        <b>Creation date: </b>{' '}
        {new Date(clinicalCase.created_at).toDateString()}
        <br />
      </Typography>
    </Container>
  )
}
