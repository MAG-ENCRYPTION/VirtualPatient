import { useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'
import './style.css'

export const StopWatch = ({
  startClock,
  getTime,
}: {
  startClock: boolean
  getTime: (time: number) => void
}) => {
  const { seconds, minutes, hours, start } = useStopwatch({
    autoStart: false,
  })

  useEffect(() => {
    if (startClock) {
      start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startClock])

  useEffect(() => {
    getTime(hours * 60 + minutes * 60 + seconds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds])

  const complete = (n: number) => {
    if (n.toString().length === 1) {
      return `0${n}`
    } else return `${n}`
  }
  return (
    <div className='circle'>
      <span className='time'>
        {complete(hours)}:{complete(minutes)}:{complete(seconds)}
      </span>
    </div>
  )
}
