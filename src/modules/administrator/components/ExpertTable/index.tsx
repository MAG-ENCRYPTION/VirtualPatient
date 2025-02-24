import styled from '@emotion/styled'
import { Info, PublishedWithChanges } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Tooltip, Typography } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { ExpertPhysician } from '../../../../entities/Doctor'
import { BackdropLoader } from '../../../shared/Backdrop'
import { ButtonWithModal } from '../../../shared/ButtonModal'
import { getExpertPhysicians } from '../../network'
import { ExpertForm } from '../NewExpertForm/ExpertForm'

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

function getFullName(params: GridValueGetterParams) {
  return `${params.row.first_name || ''} ${params.row.name || ''}`
}

export const ExpertTable = () => {
  const [expert, setExpert] = useState<ExpertPhysician[]>([])
  const [exp, setExp] = useState<ExpertPhysician>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getExpertPhysicians().then((resp) => {
      setExpert(resp)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (exp) {
      setExpert([...expert, exp])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exp])

  const deleteUser = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setExpert((prevRows) => prevRows.filter((row) => row.id !== id))
      })
    },
    [],
  )

  const updateUser = React.useCallback(
    (expert: GridValueGetterParams) => () => {
      console.log(expert)
    },
    [],
  )

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      valueGetter: getFullName,
      flex: 1,
    },
    {
      field: 'sex',
      headerName: 'Sex',
      width: 80,
    },
    {
      field: 'specialty',
      headerName: 'Speciality',
      flex: 1,
    },
    {
      field: 'grade',
      headerName: 'Grade',
      flex: 1,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      getActions: (params: GridValueGetterParams) => [
        <Tooltip title='Details'>
          <GridActionsCellItem
            icon={<Info fontSize='inherit' />}
            label='Details'
            color='info'
            onClick={deleteUser(params.row)}
          />
        </Tooltip>,
        <Tooltip title='Update'>
          <GridActionsCellItem
            icon={<PublishedWithChanges fontSize='inherit' />}
            label='Update'
            color='success'
            onClick={updateUser(params)}
          />
        </Tooltip>,
        <Tooltip title='Delete'>
          <GridActionsCellItem
            icon={<DeleteIcon style={{ color: 'red' }} />}
            label='Delete'
            onClick={deleteUser(params.id)}
          />
        </Tooltip>,
      ],
    },
  ]

  return (
    <div>
      <Container1>
        <Typography
          component='h1'
          variant='h4'
          color='primary'
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Experts
        </Typography>
      </Container1>
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}
        >
          <ButtonWithModal title={'New Expert'} buttonText={'New Expert'}>
            {(closeModal) => (
              <div style={{ width: 650 }}>
                <ExpertForm closeModal={closeModal} saveExpert={setExp} />
              </div>
            )}
          </ButtonWithModal>
        </div>

        <DataGrid
          components={{
            Toolbar: GridToolbar,
          }}
          rowHeight={45}
          rows={expert}
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
      </Container>

      <BackdropLoader loading={loading} />
    </div>
  )
}
