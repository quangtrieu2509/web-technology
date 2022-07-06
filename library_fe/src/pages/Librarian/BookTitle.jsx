import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function BookTitle() {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  useEffect(() => {
    if (role === null || role === 1) {
      navigate('/')
    }
  })

  return (
    <div>BookTitle</div>
  )
}

export default BookTitle