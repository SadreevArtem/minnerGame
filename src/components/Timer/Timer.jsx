import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const Timer = ({ death, win }) => {
  const time = useSelector((store)=> store.game)
  const timeStart = time.timeStart
  const [seconds, setSeconds] = useState(Math.floor(Date.now()/1000)-Math.floor(timeStart/1000))

  useEffect(() => {
    const tick = (num) => setSeconds(seconds + num)

    const interval = setInterval(() => tick(1), 1000)

    const cleanup = () => {
      clearInterval(interval)
    }
    if(death||win) {
      cleanup()
      setSeconds(0)
    }
    return cleanup
  })
  return (
    <div className={death||win ? 'hidden' : 'timer'}>
      <h4>Time: {seconds}</h4>
    </div>
  )
}