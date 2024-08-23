import styled from '@emotion/styled';
import { Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid'; // Importez DataGrid
import { TotalEvaluation } from '../../../../entities/TotalEvaluation';
import { BackdropLoader } from '../../../shared/Backdrop';
import { getEvaluationByLearner } from '../../network';
import { UserStateType } from "../../../../redux/userStore/reducer";

const Container = styled.div`
  margin: 20px;

  h5 {
    font-family: Montserrat;
  }
`;

export const LearnerEvaluationReport = () => {
  const [evaluationList, setEvaluationList] = useState<TotalEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer,
  ).user;

  useEffect(() => {
    setLoading(true);
    getEvaluationByLearner(connectedUser.id)
      .then((resp) => {
        console.log(resp); // Inspectez la réponse ici
        setLoading(false);
        if (resp.evaluations && resp.evaluations.length > 0) {
          setEvaluationList(resp.evaluations); // Stockez toutes les évaluations
        } else {
          console.error("Aucune évaluation trouvée dans la réponse");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'évaluation :", error);
        setLoading(false);
      });
  }, [connectedUser.id]);

  // Colonnes du DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'mark', headerName: 'Note', width: 100 },
    { field: 'duration', headerName: 'Durée (min)', width: 150 },
    { field: 'created_at', headerName: 'Date de Création', width: 200 },
    { field: 'virtual_case', headerName: 'Cas Virtuel', width: 300 },
    { field: 'clinical_case', headerName: 'Cas Clinique', width: 300 },
    { field: 'symptom', headerName: 'Symptômes', width: 300 }
  ];

  return (
    <Container>
      <BackdropLoader loading={loading} />
      {evaluationList.length > 0 ? (
        <div style={{ height: 400, width: '100%' }}>
          <Typography variant="h4" gutterBottom>Évaluations</Typography>
          <DataGrid
            rows={evaluationList}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      ) : (
        <Typography>Aucune évaluation disponible.</Typography>
      )}
    </Container>
  );
};
