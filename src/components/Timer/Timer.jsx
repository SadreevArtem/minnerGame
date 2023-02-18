import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const Timer = () => {
  const time = useSelector((store)=> store.game)
  const timeStart = time.timeStart
  const [seconds, setSeconds] = useState(Math.floor(Date.now()/1000)-Math.floor(timeStart/1000))

  useEffect(() => {
    const tick = (num) => setSeconds(seconds + num)

    const interval = setInterval(() => tick(1), 1000)

    const cleanup = () => {
      clearInterval(interval)
    }
    return cleanup
  })
  return (
    <div className="timer">
      <h5>{seconds}</h5>
    </div>
  )
}