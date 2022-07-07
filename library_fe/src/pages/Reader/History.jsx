import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function History() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === null || role === 2) {
      navigate('/');
    }
  })

  return (
    <div>History</div>
  )
}

export default History