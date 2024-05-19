function NavButton({ text, action, icon, active }) {
  return (
    <button
      onClick={action}
      className={` py-2 rounded-lg border-2 border-black font-bold hover:bg-black hover:text-white active:bg-black active:text-white active:scale-95 transition-all flex justify-start items-center ${
        active ? "bg-black text-white" : "text-black bg-white"
      }`}
    >
      <span className={`ti ${icon} text-xl px-2`}></span> {text}
    </button>
  );
}

export default NavButton;
