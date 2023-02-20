export const LeaderItem = ({name, time }) => {
  return (
    <li className="list-group-item">{name}{' '}{time} сек.</li>
  )
}