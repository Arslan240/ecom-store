import { Sun, Moon, Menu, ShoppingCart } from "lucide-react"
import { NavLink } from "react-router-dom"
import NavLinks from "./NavLinks"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../features/user/userSlice"

const Navbar = () => {
  const dispatch = useDispatch()
  const handleTheme = () => {
    dispatch(toggleTheme())
  }

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart)

  return (
    <nav className='bg-base-200'>
      <div className='navbar align-element'>
        <div className='navbar-start'>
          <NavLink
            to='/'
            className='hidden lg:flex btn btn-primary text-3xl items-center'
          >
            C
          </NavLink>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <Menu className='h-6 w-6' />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 gap-2'
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal gap-2'>
            <NavLinks />
          </ul>
        </div>
        <div className='navbar-end'>
          {/* theme setup */}
          <label className='swap swap-rotate'>
            <input type='checkbox' onChange={handleTheme} />
            {/* sun */}
            <Sun className='swap-on h-4 w-4' fill='solid' />
            {/* moon */}
            <Moon className='swap-off h-4 w-4' />
          </label>
          {/* cart link */}
          <NavLink to='/cart' className='btn btn-ghost btn-circle btn-md ml-4'>
            <div className='indicator'>
              <ShoppingCart className='h-6 w-6' />
              {numItemsInCart > 0 && (
                <span className='badge badge-sm badge-primary indicator-item'>
                  {numItemsInCart}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
