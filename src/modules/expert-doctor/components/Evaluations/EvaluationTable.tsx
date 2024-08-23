import styled from '@emotion/styled'
import { LibraryBooksOutlined } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TotalEvaluation } from '../../../../entities/TotalEvaluation'
import { ROUTES } from '../../../../routes'
import { getAllEvaluation } from '../../../learner-doctor/network'
import { BackdropLoader } from '../../../shared/Backdrop'

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 30px 0px;
  padding: 30px;
`

export const EvaluationTable = () => {
  const router = useNavigate()
  const [evaluations, setEvaluations] = useState<TotalEvaluation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllEvaluation().then((resp) => {
      setEvaluations(resp.evaluations)
      setLoading(false)
    })
  }, [])

  const columns = [
    {
      field: 'learner_physician',
      headerName: 'Learner',
      flex: 1,
      valueGetter: function getDate(
        params: GridValueGetterParams<any, TotalEvaluation>,
      ) {
        return `${params.row.learner_physician.name} ${params.row.learner_physician.first_name}`
      },
    },
    {
      field: 'type',
      headerName: 'Evaluation type',
      flex: 1,
    },
    {
      field: 'mark',
      headerName: 'Mark (/20)',
      flex: 0.5,
      valueGetter: function getDate(
        params: GridValueGetterParams<any, TotalEvaluation>,
      ) {
        return `${params.row.mark * 20}`
      },
    },
    {
      field: 'duration',
      headerName: 'Duration',
      flex: 1,
      valueGetter: function getDate(
        params: GridValueGetterParams<any, TotalEvaluation>,
      ) {
        let sec = params.row.duration
        if (sec < 60) {
          return `${sec}sec`
        }
        let min = Math.floor(sec / 60)
        return `${min}min ${sec - 60 * min}sec`
      },
    },
    {
      field: 'created_at',
      headerName: 'Consultation date',
      flex: 1,
      valueGetter: function getDate(
        params: GridValueGetterParams<any, TotalEvaluation>,
      ) {
        return new Date(params.row.created_at).toDateString()
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params: GridValueGetterParams<any, TotalEvaluation>) => [
        <Tooltip title='Details'>
          <GridActionsCellItem
            icon={<LibraryBooksOutlined />}
            label='Detail'
            color='info'
            onClick={() =>
              router(ROUTES.EXPERT.DETAIL_EVALUATION, { state: params.row })
            }
          />
        </Tooltip>,
      ],
    },
  ]

  return (
    <Container>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Medical Evaluations
      </Typography>

      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        rows={evaluations}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        disableExtendRowFullWidth={true}
        autoHeight={true}
        autoPageSize={true}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-row:hover': {
            fontWeight: 450,
            boxShadow: 3,
          },
        }}
      />

      <BackdropLoader loading={loading} />
    </Container>
  )
}
