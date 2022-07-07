import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Cart() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === null || role === 2) {
      navigate('/');
    }
  })

  return (
    <div>Cart</div>
  )
}

export default Cart