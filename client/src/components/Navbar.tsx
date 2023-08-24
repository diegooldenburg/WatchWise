const Navbar = () => {
  return (
    <nav className="flex justify-between bg-secondary p-6 fixed top-0 w-full">
      <div className="text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">WatchWise</span>
      </div>
      <div>
        <div>
          <button className="text-sm px-4 py-2 leading-none border rounded text-black bg-primary-button border-transparent hover:bg-primary-button-hover mt-4 lg:mt-0">
            Sign Up
          </button>
          <button className="text-sm px-4 py-2 leading-none border rounded text-black bg-secondary-button border-transparent hover:bg-secondary-button-hover   mt-4 lg:mt-0 ml-2">
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
