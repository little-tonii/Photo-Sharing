function InputFieldForm({ type, name, id, placeholder, value, handleOnChange }) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className="outline-none border-b-2 focus:border-black hover:border-black w-full p-2"
      placeholder={placeholder}
      value={value}
      onChange={(event) => handleOnChange(event.target.value)}
    />
  );
}

export default InputFieldForm;
