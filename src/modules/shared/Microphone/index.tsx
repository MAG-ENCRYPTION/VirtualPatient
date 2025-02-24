import { MicNone } from '@mui/icons-material'
import './micro.css'

export const MicrophoneAnimation = ({ listening }: { listening: boolean }) => {
  return (
    <div className='container'>
      <button className='mic-btn type2'>
        <MicNone sx={{ fontSize: 40 }} />
      </button>
      <div className={listening ? 'pulse-ring' : ''}></div>
    </div>
  )
}
