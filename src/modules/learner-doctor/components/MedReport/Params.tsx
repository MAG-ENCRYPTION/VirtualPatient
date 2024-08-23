import styled from '@emotion/styled'
import { Grid, Typography } from '@mui/material'
import blood from '../../../../assets/images/icons/blood.png'
import breath from '../../../../assets/images/icons/breath.png'
import heartbeat from '../../../../assets/images/icons/heartbeat.png'
import height from '../../../../assets/images/icons/height.png'
import temp from '../../../../assets/images/icons/temp.png'
import weight from '../../../../assets/images/icons/weight.png'
import { MedicalParameter } from '../../../../entities/MedicalParameter'

const Container = styled.div``

export const MedParams = ({
  params,
  closeModal,
}: {
  params: MedicalParameter[]
  closeModal?: () => void
}) => {
  return (
    <Container>
      <Grid container spacing={10} sx={{ mb: 2 }}>
        {params.map((param) => {
          let item = param.type_parameter.name.toLowerCase()
          return (
            <Grid
              item
              key={param.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {item.includes('temp') ? (
                <img
                  alt='temp-svg'
                  src={temp}
                  height={50}
                  width={50}
                  style={{ objectFit: 'contain' }}
                />
              ) : item.includes('breath') ? (
                <img
                  alt='breath-svg'
                  src={breath}
                  height={50}
                  width={50}
                  style={{ objectFit: 'contain' }}
                />
              ) : item.includes('blood') ? (
                <img
                  alt='blood-svg'
                  src={blood}
                  height={50}
                  width={50}
                  style={{ objectFit: 'contain' }}
                />
              ) : item.includes('heart') ? (
                <img
                  alt='heartbeat-svg'
                  src={heartbeat}
                  height={50}
                  width={50}
                  style={{ objectFit: 'contain' }}
                />
              ) : item.includes('height') ? (
                <img
                  alt='height-svg'
                  src={height}
                  height={50}
                  width={50}
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <img
                  alt='weight-svg'
                  src={weight}
                  height={50}
                  width={50}
                  style={{ objectFit: 'contain' }}
                />
              )}

              <Typography variant='body1'>
                {param.type_parameter.name}
              </Typography>
              <Typography variant='body2'>
                <b>
                  {param.value} {param.type_parameter.unit}
                </b>
              </Typography>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
