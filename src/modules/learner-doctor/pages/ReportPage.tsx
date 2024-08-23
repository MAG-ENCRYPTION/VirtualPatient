import { Dashboard } from '../components/LearnerDahsboard'
import {LearnerEvaluationReport} from "../components/Evaluation";

export const ReportPage = () => {
  return (
    <Dashboard>
      <LearnerEvaluationReport />
    </Dashboard>
  );
};
