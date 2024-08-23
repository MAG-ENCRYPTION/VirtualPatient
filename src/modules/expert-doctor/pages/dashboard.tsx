import styled from '@emotion/styled'
import { Feed, ThumbDownOffAlt, ThumbUpOffAlt } from '@mui/icons-material'
import { IconButton, TableContainer, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useState } from 'react'
import { DashboardStats } from '../components/DashboardStats'
import { Dashboard } from '../components/ExpertDahsboard'

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 30px 0px;
  padding: 30px;
`

export const ExpertDashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState([
    {
      name: 'Talom Franklin',
      speciality: 'Generalist',
      date: '25 Oct. 2021',
      score: 18,
      evaluated: true,
    },
    {
      name: 'Duval Franklin',
      speciality: 'Generalist',
      date: '25 Oct. 2021',
      score: 16,
      evaluated: false,
    },
    {
      name: 'Jean yves',
      speciality: 'Generalist',
      date: '25 Oct. 2021',
      score: 10,
      evaluated: false,
    },
    {
      name: 'Marcel Marvel',
      speciality: 'Generalist',
      date: '25 Oct. 2021',
      score: 15,
      evaluated: true,
    },
  ])

  return (
    <Dashboard>
      <DashboardStats />

      <Container>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          Recent Evaluations
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Learner</TableCell>
                <TableCell align='left'>Medical Speciality</TableCell>
                <TableCell align='left'>Submission date</TableCell>
                <TableCell align='left'>Score&nbsp;(/20)</TableCell>
                <TableCell align='left'>Evaluated</TableCell>
                <TableCell align='left'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align='left'>{row.name}</TableCell>
                  <TableCell align='left'>{row.speciality}</TableCell>
                  <TableCell align='left'>{row.date}</TableCell>
                  <TableCell align='left'>{row.score}</TableCell>
                  <TableCell align='left'>
                    {row.evaluated ? (
                      <ThumbUpOffAlt sx={{ color: 'green' }} />
                    ) : (
                      <ThumbDownOffAlt sx={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell align='left'>
                    <IconButton>
                      <Feed />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Dashboard>
  )
}
