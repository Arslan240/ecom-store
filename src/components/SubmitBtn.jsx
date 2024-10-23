import React from "react"
import { useNavigation } from "react-router-dom"

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  return (
    <button
      className='btn btn-primary btn-block uppercase'
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className='loading loading-spinner' />
        </>
      ) : (
        text || "submit"
      )}
    </button>
  )
}

export default SubmitBtn
