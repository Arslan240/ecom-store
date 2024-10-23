import React from "react"
import { redirect, useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import { customFetch } from "../../utils"
import {
  ComplexPaginationContainer,
  OrdersList,
  SectionTitle,
} from "../components"

const ordersQuery = (params, user) => {
  // construct page url
  const url = `/orders${params.page ? `?page=${params.page}` : ``}`
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  }
}

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    console.log("order loader")
    const { user } = store.getState().userState

    // Authorisation
    if (!user) {
      toast.warn("You must be logged in to view orders")
      return redirect("/login")
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      )
      // in meta.pagination, page attribute doesn't get updated it always remains 1 som new the selected page number is not highlighted
      return { orders: response.data.data, meta: response.data.meta }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error placing the order"
      toast.error(errorMessage)
      console.log(error)

      // auth error, redirect to login page
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return redirect("/login")
      }
      return null
    }
  }

const Orders = () => {
  const { meta } = useLoaderData()
  console.log(meta)
  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />
  }

  return (
    <>
      <SectionTitle text={"Your Orders"} />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  )

  return <div className='text-4xl'>Orders</div>
}

export default Orders
