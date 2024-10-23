const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <label className='form-control '>
      <div className='label'>
        <span className='label-text capitalize'>{label}</span>
      </div>
      <input
        className={`input input-bordered ${size}`}
        type={type}
        name={name}
        defaultValue={defaultValue}
      />
    </label>
  )
}

export default FormInput
