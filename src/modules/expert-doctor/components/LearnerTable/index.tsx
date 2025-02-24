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
import { Doctor } from '../../../../entities/Doctor'
import { ROUTES } from '../../../../routes'
import { BackdropLoader } from '../../../shared/Backdrop'
import { getLearners } from '../../network'

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 30px 0px;
  padding: 30px;
`

export const LearnerTable = () => {
  const router = useNavigate()
  const [learners, setLearners] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLearners().then((learners) => {
      setLearners(learners)
      setLoading(false)
    })
  }, [])

  const columns = [
    {
      field: 'name',
      headerName: 'Learner',
      flex: 1,
      valueGetter: function getDate(
        params: GridValueGetterParams<any, Doctor>,
      ) {
        return `${params.row.name} ${params.row.first_name}`
      },
    },
    {
      field: 'specialty',
      headerName: 'Speciality',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email address',
      flex: 1,
    },
    {
      field: 'sex',
      headerName: 'Gender',
      width: 100,
      valueGetter: function getDate(
        params: GridValueGetterParams<any, Doctor>,
      ) {
        return params.row.sex === 'M' ? 'Male' : 'Female'
      },
    },
    {
      field: 'created_at',
      headerName: 'Registration date',
      flex: 1,
      valueGetter: function getDate(
        params: GridValueGetterParams<any, Doctor>,
      ) {
        return new Date(params.row.created_at).toDateString()
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params: GridValueGetterParams<any, Doctor>) => [
        <Tooltip title='Details'>
          <GridActionsCellItem
            icon={<LibraryBooksOutlined />}
            label='Detail'
            color='info'
            disabled
            onClick={() =>
              router(ROUTES.EXPERT.DETAIL_CASE, { state: params.row })
            }
          />
        </Tooltip>,
      ],
    },
  ]

  return (
    <Container>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Medical Learners
      </Typography>

      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        rows={learners}
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
