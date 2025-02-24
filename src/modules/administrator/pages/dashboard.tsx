import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Dashboard } from '../components/AdminDashboard'
import { DashboardStats } from '../components/DashboardStats'

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 30px 0px;
  padding: 30px;
`

const Container1 = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 30px 0px;
  padding: 15px;
`

export const AdminDashboard = () => {
  const columns = [
    {
      field: 'operation',
      headerName: 'Operation',
      flex: 1,
    },
    {
      field: 'table',
      headerName: 'Table',
      flex: 1,
    },
    {
      field: 'doctor',
      headerName: 'Author',
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Creation date',
      flex: 1,
    },
  ]

  const data = [
    {
      id: 1,
      operation: 'CREATE',
      table: 'CLINICAL CASE',
      doctor: 'JEAN JULE',
      created_at: new Date().toDateString(),
    },
    {
      id: 2,
      operation: 'CREATE',
      table: 'CLINICAL CASE',
      doctor: 'JEAN JULE',
      created_at: new Date().toDateString(),
    },
    {
      id: 3,
      operation: 'UPDATE',
      table: 'CLINICAL CASE',
      doctor: 'JEAN JULE',
      created_at: new Date().toDateString(),
    },
    {
      id: 4,
      operation: 'CREATE',
      table: 'CLINICAL CASE',
      doctor: 'JEAN JULE',
      created_at: new Date().toDateString(),
    },
    {
      id: 5,
      operation: 'DELETE',
      table: 'CLINICAL CASE',
      doctor: 'JEAN JULE',
      created_at: new Date().toDateString(),
    },
    {
      id: 6,
      operation: 'CREATE',
      table: 'CLINICAL CASE',
      doctor: 'JEAN JULE',
      created_at: new Date().toDateString(),
    },
    {
      id: 7,
      operation: 'UPDATE',
      table: 'CLINICAL CASE',
      doctor: 'JEAN JULE',
      created_at: new Date().toDateString(),
    },
    {
      id: 8,
      operation: 'DELETE',
      table: 'CLINICAL CASE',
      doctor: 'JEAN JULE',
      created_at: new Date().toDateString(),
    },
    {
      id: 9,
      operation: 'CREATE',
      table: 'CLINICAL CASE',
      doctor: 'JEAN JULE',
      created_at: new Date().toDateString(),
    },
  ]

  return (
    <Dashboard>
      <DashboardStats />
      <div>
        <Container1>
          <Typography
            component='h2'
            variant='h5'
            color='primary'
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Recent Operations
          </Typography>
        </Container1>
        <Container>
          <div>
            <DataGrid
              components={{
                Toolbar: GridToolbar,
              }}
              rowHeight={45}
              rows={data}
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
                  color: 'primary.main',
                  fontWeight: 450,
                  boxShadow: 3,
                },
              }}
            />
          </div>
        </Container>
      </div>
    </Dashboard>
  )
}
