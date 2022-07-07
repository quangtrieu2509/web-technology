import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function AccountInfo() {
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === null) {
      navigate('/')
    }
  })

  return (
    <div>AccountInfo abcdef</div>
  )
}

export default AccountInfo