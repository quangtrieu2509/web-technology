
import './readerComponent.css'

function CartItem(props) {
  return (
    <div className="cart-item">
      <img
        src={props.img}
        alt={props.name}
      />
      <div className='cart-item-info'>
        <div className='cart-item-name'>{props.name}</div>
        <div className='cart-item-quantity'>
          <div className='quantity'>Tống số cuốn: <i>{props.quantity}</i></div>
          <div>Số cuốn còn lại: <i>{props.quantityleft}</i></div>
        </div>
      </div>
    </div>
  )
}

export default CartItem;