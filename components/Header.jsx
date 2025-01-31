import { Search } from "lucide-react";
import { Input } from "./ui/input";

const Header = () => {
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">Notes</h1>

      <div className="bg-[#E9EDF5] px-4 py-2 rounded-full h-16 w-16 font-semibold text-2xl flex justify-center items-center">
        EF
      </div>
    </header>
  );
};

export default Header;
