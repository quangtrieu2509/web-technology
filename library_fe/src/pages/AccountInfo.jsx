import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function AccountInfo() {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  useEffect(() => {
    if (role === null) {
      navigate('/')
    }
  })

  return (
    <div>AccountInfo abcdef</div>
  )
}

export default AccountInfo