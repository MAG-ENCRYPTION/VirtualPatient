import styled from '@emotion/styled'
import { Home } from '@mui/icons-material'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import anatomy from '../../../assets/images/icons/anatomy.png'
import brain from '../../../assets/images/icons/brain.png'
import digestive from '../../../assets/images/icons/digestive.png'
import endo from '../../../assets/images/icons/endo.png'
import heart from '../../../assets/images/icons/heart.png'
import lungs from '../../../assets/images/icons/lungs.png'
import lymph from '../../../assets/images/icons/lymph.png'
import muscle from '../../../assets/images/icons/muscle.png'
import reprod from '../../../assets/images/icons/reprod.png'
import urinary from '../../../assets/images/icons/urinary.png'
import { ROUTES } from '../../../routes'
import { Dashboard } from '../components/LearnerDahsboard'

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 30px 0px;
  padding: 30px;
`

const SpecialityContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  width: 230px;
  height: 90px;
  cursor: pointer;

  > img {
    margin-right: 10px;
  }

  > div > h6 {
    color: #777;
    font-family: 'Montserrat';
    font-size: 16px;
  }

  > div > p {
    color: #777;
    font-size: 12px;
  }

  &:hover {
    margin-top: -2px;
    transition: 0.2s;
  }
`

export const Specialities = () => {
  const router = useNavigate()
  const trainingType = useLocation().state as string

  return (
    <Dashboard>
      <Breadcrumbs>
        <Link
          underline='hover'
          color='inherit'
          onClick={() => router(ROUTES.LEARNERS.DASHBOARD)}
          style={{ cursor: 'pointer' }}
        >
          <Home sx={{ mr: 0.5, mb: -0.2 }} fontSize='inherit' />
          Dashboard
        </Link>
        <Typography color='text.primary'>Specialities</Typography>
      </Breadcrumbs>

      <Container>
        <Typography variant='h6' gutterBottom>
          Medical Systems
        </Typography>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {SPECIALITIES.map((spec) => (
            <SpecialityContainer
              key={spec.value}
              onClick={() =>
                window.open(
                  ROUTES.LEARNERS.CONSULTATION(trainingType),
                  '_blank',
                )
              }
            >
              <img
                alt='spaciality-svg'
                src={spec.icon}
                height={50}
                width={50}
                style={{ objectFit: 'contain' }}
              />
              <div>
                <Typography variant='h6'>{spec.label}</Typography>
                <Typography>{spec?.description}</Typography>
              </div>
            </SpecialityContainer>
          ))}
        </div>
      </Container>
    </Dashboard>
  )
}

const SPECIALITIES = [
  {
    label: 'Random',
    value: '',
    icon: anatomy,
    description: 'A case from any system can be choosen',
  },
  {
    label: 'Respiratory system',
    value: 'RESPIRATORY SYSTEM',
    icon: lungs,
  },
  {
    label: 'Cardiovascular System',
    value: 'CARDIOVASCULAR SYSTEM',
    icon: heart,
  },
  {
    label: 'Muscular System',
    value: 'MUSCULAR SYSTEM',
    icon: muscle,
  },
  {
    label: 'Nervous System',
    value: 'NERVOUS SYSTEM',
    icon: brain,
  },
  {
    label: 'Digestive System',
    value: 'DIGESTIVE SYSTEM',
    icon: digestive,
  },
  {
    label: 'Urinary System',
    value: 'URINARY SYSTEM',
    icon: urinary,
  },
  {
    label: 'Endocrine System',
    value: 'ENDOCRINE SYSTEM',
    icon: endo,
  },
  {
    label: 'Lymphatic system',
    value: 'LYMPHATIC SYSTEM',
    icon: lymph,
  },
  {
    label: 'Reproductive system',
    value: 'REPRODUCTIVE SYSTEM',
    icon: reprod,
  },
]
