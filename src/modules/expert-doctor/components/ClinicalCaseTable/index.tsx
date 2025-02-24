import styled from '@emotion/styled'
import { Add, LibraryBooksOutlined } from '@mui/icons-material'
import { Button, Tooltip, Typography } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClinicalCase } from '../../../../entities/ClinicalCase'
import { ROUTES } from '../../../../routes'
import { BackdropLoader } from '../../../shared/Backdrop'
import { getClinicalCases } from '../../network'

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 30px 0px;
  padding: 30px;
`

export const ClinicalCaseTable = () => {
  const router = useNavigate()
  const [cases, setCases] = useState<ClinicalCase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getClinicalCases().then((cases) => {
      setCases(cases)
      setLoading(false)
    })
  }, [])

  const columns = [
    {
      field: 'final_diagnosis',
      headerName: 'Medical case',
      flex: 1,
    },
    {
      field: 'initial_problem',
      headerName: "Patient's complain",
      width: 200,
    },
    {
      field: 'difficulty',
      headerName: 'Difficulty',
      flex: 1,
    },
    {
      field: 'specialty',
      headerName: 'Speciality',
      flex: 1,
    },
    {
      field: 'system',
      headerName: 'Body system',
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Creation date',
      flex: 1,
      valueGetter: function getDate(
        params: GridValueGetterParams<any, ClinicalCase>,
      ) {
        return new Date(params.row.created_at).toDateString()
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params: GridValueGetterParams<any, ClinicalCase>) => [
        <Tooltip title='Details'>
          <GridActionsCellItem
            icon={<LibraryBooksOutlined />}
            label='Detail'
            color='info'
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
        Clinical Cases
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => router(ROUTES.EXPERT.NEW_CASE)}
          sx={{ marginBottom: 2 }}
        >
          New case
        </Button>
      </div>

      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        rows={cases}
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
