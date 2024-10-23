import { Link, useLoaderData } from "react-router-dom"
import { customFetch, formatPrice, generateAmountOptions } from "../../utils"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addItem } from "../features/cart/cartSlice"

const singleProductQuery = (id) => {
  return {
    queryKey: ["single", id],
    queryFn: () => customFetch(`/products/${id}`),
  }
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params
    const response = await queryClient.ensureQueryData(singleProductQuery(id))
    return { product: response.data.data }
  }

const SingleProduct = () => {
  const { product } = useLoaderData()
  const { image, title, price, description, colors, company } =
    product.attributes
  const [productColor, setProductColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)
  const formattedPrice = formatPrice(price)

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value))
  }

  // we'll treat product with different colors as different items. So we'll setup a productID.
  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    company,
    productColor,
    amount,
    price,
  }

  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }))
  }

  return (
    <section>
      <div className='text-md breadcrumbs'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </div>
      {/* product */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* image */}
        <img
          src={image}
          alt={title}
          className='w-96 h-96 object-cover rounded-lg lg:w-full'
        />
        {/* product */}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>
          <h4 className='text-xl text-neutral-content font-bold mt-2'>
            {company}
          </h4>
          <p className='mt-3 text-xl'>{formattedPrice}</p>
          <p className='mt-6 leading-8'>{description}</p>
          {/* colors */}
          <div className='mt-6'>
            <h4 className='text-md font-medium tracking-wider capitalize'>
              colors
            </h4>
            <div className='mt-2'>
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type='button'
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                )
              })}
            </div>
          </div>
          {/* amount */}
          <div className='form-control w-full max-w-xs'>
            <label className='label' htmlFor='amount'>
              <h4 className='text-md font-medium tracking-wider capitalize'>
                Amount
              </h4>
            </label>
            <select
              className='select select-secondary select-bordered select-md'
              id='amount'
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(10)}
              {/* <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option> */}
            </select>
          </div>
          {/* cart btn */}
          <div className='mt-10'>
            <button className='btn btn-secondary btn-md' onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct
