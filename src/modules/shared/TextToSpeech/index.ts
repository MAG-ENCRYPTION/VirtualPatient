type VoiceCategory = 'Microsoft' | 'Google'
type Gender = 'M' | 'F'

export const Speak = (text: string, sex: Gender, voiceCat: VoiceCategory) => {
  let voices = window.speechSynthesis.getVoices()

  if (voices.length === 0) {
    setTimeout(() => {
      voices = window.speechSynthesis.getVoices()
      VocalSpeech(text, sex, voiceCat, voices)
    }, 500)
  } else {
    VocalSpeech(text, sex, voiceCat, voices)
  }
}

const VocalSpeech = (
  text: string,
  sex: Gender,
  voiceCat: VoiceCategory,
  voices: SpeechSynthesisVoice[],
) => {
  let speechText = new SpeechSynthesisUtterance(text)

  if (sex === 'M') {
    if (voiceCat === 'Microsoft') {
      speechText.voice = voices[1]
    } else {
      speechText.voice = voices[9]
    }
  } else {
    if (voiceCat === 'Microsoft') {
      speechText.voice = voices[2]
    } else {
      speechText.voice = voices[8]
    }
  }
  window.speechSynthesis.speak(speechText)
}
