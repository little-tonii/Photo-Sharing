function ButtonForm({ text, handleOnClick, disabled }) {
  return (
    <button
      className="active:scale-95 transition-all bg-black text-white w-full p-4 rounded-lg border-2 border-white hover:border-black hover:bg-white hover:text-black bg-opacity-80 active:bg-black active:border-white active:text-white"
      onClick={(event) => {
        event.preventDefault();
        handleOnClick();
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default ButtonForm;
