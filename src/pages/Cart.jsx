import { useSelector } from "react-redux"
import { CartItemsList, CartTotals, SectionTitle } from "../components"
import { Link } from "react-router-dom"

const Cart = () => {
  // temp
  const { user } = useSelector((state) => state.userState)

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart)

  if (numItemsInCart === 0) {
    return <SectionTitle text='Your cart is empty' />
  }
  return (
    <>
      <SectionTitle text='Shoppping Cart' />
      <div className='mt-8 grid gap-8 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {user ? (
            <Link
              to='/checkout'
              className='btn btn-primary btn-block mt-8 capitalize'
            >
              proceed to checkout
            </Link>
          ) : (
            <Link
              to='/login'
              className='btn btn-primary btn-block mt-8 capitalize'
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
