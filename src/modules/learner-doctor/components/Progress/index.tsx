import styled from '@emotion/styled'
import { Close } from '@mui/icons-material'
import { Chip, Grid, IconButton, Stack, Typography } from '@mui/material'
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid'
import { HypothesisTuto } from '../../../../entities/tutor/HypothesisTuto'
import { MedExamTuto } from '../../../../entities/tutor/MedExamTuto'
import { PhyDiagnosisTuto } from '../../../../entities/tutor/PhyDiagnosisTuto'
import { QuesPairType } from '../DialogBox'

const Container = styled.div`
  padding-left: 30px;

  > .top {
    display: flex;
    justify-content: space-between;

    > h5 {
      font-family: Montserrat;
    }
  }

  > .grid {
    flex: 1;
    backgroud-color: green;
  }
`

export const Progress = ({
  closeModal,
  questions,
  hypothesis,
  phyDiagnosis,
  medDiagnosis,
}: {
  closeModal?: () => void
  questions: QuesPairType[]
  hypothesis: HypothesisTuto[]
  phyDiagnosis: PhyDiagnosisTuto[]
  medDiagnosis: MedExamTuto[]
}) => {
  console.log({ hypothesis })

  return (
    <Container>
      <div className='top'>
        <Typography variant='h5'>Ongoing Progress Report</Typography>

        <IconButton onClick={closeModal}>
          <Close sx={{ fontSize: 40 }} />
        </IconButton>
      </div>

      <Grid container className='grid' spacing={5}>
        <Grid item xs={7}>
          <Typography variant='h6' gutterBottom>
            Anamnesis
          </Typography>

          <DataGrid
            rows={questions}
            rowHeight={40}
            pageSize={10}
            columns={questionColumns}
            disableSelectionOnClick
            autoHeight={true}
            sx={{
              width: 700,
              border: 2,
              borderColor: '#777',
            }}
          />
        </Grid>

        <Grid item xs={5}>
          <Typography variant='h6' gutterBottom>
            Physical Diagnosis
          </Typography>
          <DataGrid
            rows={phyDiagnosis}
            rowHeight={40}
            pageSize={10}
            columns={phyExamColumns}
            disableSelectionOnClick
            autoHeight={true}
            sx={{
              width: 500,
              border: 2,
              borderColor: '#777',
            }}
          />
        </Grid>

        <Grid item xs={7}>
          <Typography variant='h6' gutterBottom>
            Hypothesis
          </Typography>

          <DataGrid
            rows={hypothesis}
            columns={hypothesisColumn}
            rowHeight={40}
            pageSize={10}
            disableSelectionOnClick
            autoHeight={true}
            sx={{
              width: 700,
              border: 2,
              borderColor: '#777',
            }}
          />
        </Grid>

        <Grid item xs={5}>
          <Typography variant='h6' gutterBottom>
            Medical Examination
          </Typography>

          <DataGrid
            rows={medDiagnosis}
            columns={examColumns}
            rowHeight={40}
            pageSize={10}
            disableSelectionOnClick
            autoHeight={true}
            sx={{
              width: 500,
              border: 2,
              borderColor: '#777',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

const questionColumns = [
  {
    field: 'question',
    headerName: 'Question',
    flex: 1,
  },
  {
    field: 'answer',
    headerName: 'Answer',
    flex: 1,
  },
]

const examColumns = [
  {
    field: 'exam',
    headerName: 'Examination',
    flex: 2,
  },
  {
    field: 'result',
    headerName: 'Result',
    flex: 1,
  },
  {
    field: 'verdict',
    headerName: 'Verdict',
    flex: 1,
  },
]

const phyExamColumns = [
  {
    field: 'exam',
    headerName: 'Physical Examination',
    flex: 1,
  },
  {
    field: 'verdict',
    headerName: 'Verdict',
    flex: 1,
  },
]

const hypothesisColumn = [
  {
    field: 'symptoms',
    headerName: 'Symptoms',
    flex: 1,
  },
  {
    field: 'hypothesis',
    type: 'actions',
    headerName: 'Hypothesis',
    flex: 2,
    getActions: (params: GridValueGetterParams<any, HypothesisTuto>) => [
      <Stack direction='row' spacing={0.2}>
        {params.row.hypothesis.map((it) => (
          <Chip
            label={it.key}
            variant='outlined'
            color={it.val ? 'success' : 'error'}
            size='small'
          />
        ))}
      </Stack>,
    ],
  },
  {
    field: 'reason',
    headerName: 'Reason',
    flex: 1,
  },
]
