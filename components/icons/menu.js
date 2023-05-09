function Menu(props) {
  const { setOpenMenu, openMenu } = props;
  return (
    <svg
      onClick={() => setOpenMenu(!openMenu)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={!openMenu ? "M3.75 9h16.5m-16.5 6.75h16.5" : "M6 18L18 6M6 6l12 12"}
      />
    </svg>
  );
}

export default Menu;
