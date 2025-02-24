import styled from '@emotion/styled';
import { LibraryBooksOutlined } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Ajout de l'importation

import { TotalEvaluation } from '../../../../entities/TotalEvaluation';
import { ROUTES } from '../../../../routes';
import { getEvaluationByLearner } from '../../network';
import { BackdropLoader } from '../../../shared/Backdrop';
import {UserStateType} from "../../../../redux/userStore/reducer";

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 30px 0px;
  padding: 30px;
`;

export const LearnerEvaluationReport = () => {
  const [evaluationList, setEvaluationList] = useState<TotalEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const route = useNavigate();
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer.user,
  );

  useEffect(() => {
    setLoading(true);
    getEvaluationByLearner(connectedUser.id)
      .then((resp) => {
        setLoading(false);
        if (resp.evaluations && resp.evaluations.length > 0) {
          setEvaluationList(resp.evaluations);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [connectedUser.id]);

  const columns = [
    {
      field: 'id',
      headerName: 'Number',
      flex: 1,
      valueGetter: (params: GridValueGetterParams<any, TotalEvaluation>) => {
        return `${params.row.id}`;
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
      valueGetter: (params: GridValueGetterParams<any, TotalEvaluation>) => {
        return `${params.row.mark * 20}`;
      },
    },
    {
      field: 'duration',
      headerName: 'Duration',
      flex: 1,
      valueGetter: (params: GridValueGetterParams<any, TotalEvaluation>) => {
        let sec = params.row.duration;
        if (sec < 60) {
          return `${sec} sec`;
        }
        let min = Math.floor(sec / 60);
        return `${min} min ${sec - 60 * min} sec`;
      },
    },
    {
      field: 'created_at',
      headerName: 'Consultation date',
      flex: 1,
      valueGetter: (params: GridValueGetterParams<any, TotalEvaluation>) => {
        return new Date(params.row.created_at).toDateString();
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params: GridValueGetterParams<any, TotalEvaluation>) => [
        <Tooltip title='Details' key={params.row.id}>
          <GridActionsCellItem
            icon={<LibraryBooksOutlined />}
            label='Detail'
            color='info'
            onClick={() =>
              route(ROUTES.LEARNERS.CONSULT_REPORT(params.row.id), { state: params.row })
            }
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <Container>
      <BackdropLoader loading={loading} />
      {evaluationList.length > 0 ? (
        <>
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            Medical Evaluations
          </Typography>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
            }}
            rows={evaluationList} // Correction ici
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
        </>
      ) : (
        <Typography>Aucune évaluation disponible.</Typography>
      )}
    </Container>
  );
};
