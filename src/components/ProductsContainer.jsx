import { useLoaderData } from "react-router-dom"
import ProductsGrid from "./ProductsGrid"
import ProductsList from "./ProductsList"
import { List, LayoutGrid } from "lucide-react"
import { useState } from "react"

const ProductsContainer = () => {
  const { meta } = useLoaderData()
  const { total: totalProducts } = meta.pagination
  const [layout, setLayout] = useState("grid")

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-based-content"
    }`
  }

  return (
    <>
      {/* header */}
      <div className='flex justify-between items-center mt-8 botder-b border-base-300 pb-5'>
        <h4 className='font-medium text-md'>
          {totalProducts} product{totalProducts > 1 && "s"}
        </h4>
        <div className='flex gap-x-2'>
          <button
            type='button'
            onClick={() => setLayout("grid")}
            className={setActiveStyles("grid")}
          >
            <LayoutGrid fill='solid' strokeWidth={0.5} />
          </button>
          <button
            type='button'
            onClick={() => setLayout("list")}
            className={setActiveStyles("list")}
          >
            <List fill='solid' />
          </button>
        </div>
      </div>
      {/* products */}
      <div>
        {totalProducts === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  )
}

export default ProductsContainer
