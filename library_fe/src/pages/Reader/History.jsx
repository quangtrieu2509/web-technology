import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function History() {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  useEffect(() => {
    if (role === null || role === 2) {
      navigate('/')
    }
  })

  return (
    <div>History</div>
  )
}

export default History