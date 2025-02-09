const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-2 py-2 text-sm ">
      <div className="flex gap-3">
        <img src="vscode.svg" alt="vscode.svg" className="w-4" />
        <ul className="lg:flex gap-3 cursor-pointer hidden">
          <li>File</li>
          <li>Edit</li>
          <li>View</li>
          <li>Go</li>
          <li>Run</li>
          <li>Terminal</li>
          <li>Help</li>
        </ul>
      </div>
      <div>Daryl Sumabal - Visual Studio Code</div>
      <div>
        <div className="flex gap-2">
          <div className="rounded-full bg-[#f1fa8c] p-[7px] cursor-pointer" />
          <div className="rounded-full bg-[#50fa7a] p-[7px] cursor-pointer" />
          <div className="rounded-full bg-[#ff5454] p-[7px] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
