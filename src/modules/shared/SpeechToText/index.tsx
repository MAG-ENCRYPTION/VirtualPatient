import { Alert, Button, ButtonGroup } from '@mui/material'
import { useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { MicrophoneAnimation } from '../Microphone'

export const SpeechToText = ({
  getText,
}: {
  getText: (text: string) => void
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()

  useEffect(() => {
    getText(transcript)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript])

  if (!browserSupportsSpeechRecognition) {
    return (
      <Alert severity='error'>
        Sorry!!! Your browser doesn't support speech recognition.
      </Alert>
    )
  }

  if (!isMicrophoneAvailable) {
    return (
      <Alert severity='error'>
        The microphone of your device in unavailable.
      </Alert>
    )
  }

  return (
    <div>
      <MicrophoneAnimation listening={listening} />

      <ButtonGroup variant='outlined' sx={{ mt: 2 }}>
        <Button
          onClick={async () => {
            await SpeechRecognition.startListening({ continuous: true })
          }}
        >
          Start
        </Button>
        <Button onClick={SpeechRecognition.stopListening}>Stop</Button>
        <Button onClick={resetTranscript}>Reset</Button>
      </ButtonGroup>

      <p>{transcript}</p>
    </div>
  )
}
