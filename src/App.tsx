import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './assets/global-css/global.css';
import { AdminDashboard } from './modules/administrator/pages/dashboard';
import { Expert } from './modules/administrator/pages/expert';
import { ClinicalCase } from './modules/expert-doctor/pages/clinical-case';
import { ExpertDashboard } from './modules/expert-doctor/pages/dashboard';
import { DetailCasePage } from './modules/expert-doctor/pages/detailCase';
import { EvaluationDetailReport } from './modules/expert-doctor/pages/evaluationDetail';
import { EvaluationPage } from './modules/expert-doctor/pages/evaluations';
import { LearnerPage } from './modules/expert-doctor/pages/learners';
import { NewCasePage } from './modules/expert-doctor/pages/newCase';
import { HomePage } from './modules/homePage';
import { EvaluationReport } from './modules/learner-doctor/components/Report';
import { Consultation } from './modules/learner-doctor/pages/consultation';
import { LearnerDashboard } from './modules/learner-doctor/pages/dashboard';
import { Specialities } from './modules/learner-doctor/pages/specialities';
import { LoginPage } from './modules/login/pages';
import { RegistrationPage } from './modules/registration/pages';
import { NotConnected } from './modules/security/notConnected';
import { PageNotFound } from './modules/security/pageNotFound';
import { Unauthorized } from './modules/security/unauthorized';
import {ExpertProfilePage} from "./modules/expert-doctor/pages/ExpertProfilePage";
import {LearnerProfilePage} from "./modules/learner-doctor/pages/LearnerProfilePage";
import {ReportPage} from "./modules/learner-doctor/pages/ReportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='signin' element={<LoginPage />} />
        <Route path='signup' element={<RegistrationPage />} />

        <Route path='expert'>
          <Route index element={<Navigate to='/page-not-found' replace />} />
          <Route path='dashboard' element={<ExpertDashboard />} />
          <Route path='cases' element={<ClinicalCase />} />
          <Route path='cases/new' element={<NewCasePage />} />
          <Route path='cases/detail' element={<DetailCasePage />} />
          <Route path='learners' element={<LearnerPage />} />
          <Route path='evaluation' element={<EvaluationPage />} />
          <Route path='profile' element={<ExpertProfilePage />} />
          <Route
            path='evaluation/report'
            element={<EvaluationDetailReport />}
          />
        </Route>

        <Route path='admin'>
          <Route index element={<Navigate to='/page-not-found' replace />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='experts' element={<Expert />} />
        </Route>

        <Route path='learner'>
          <Route index element={<Navigate to='/page-not-found' replace />} />
          <Route path='dashboard' element={<LearnerDashboard />} />
          <Route path='specialities' element={<Specialities />} />
          <Route path='profile' element={<LearnerProfilePage />} />
          <Route path='consultation/:training' element={<Consultation />} />
          <Route
            path='consultation-report/:evaluation'
            element={<EvaluationReport />}
          />
          <Route
            path='evaluation'
            element={<ReportPage />}
          />
        </Route>

        <Route path='/page-not-found' element={<PageNotFound />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/not-connected' element={<NotConnected />} />
        <Route path='*' element={<Navigate to='/page-not-found' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
