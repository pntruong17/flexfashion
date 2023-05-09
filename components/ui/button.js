function Button({ children, ...props }) {
  return (
    <button
      className="bg-indigo-600 hover:bg-gray-700 px-4 py-3 text-white text-sm font-Outfit font-bold tracking-widest uppercase focus:outline-none"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
