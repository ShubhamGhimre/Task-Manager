import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-16 px-20 bg-slate-400 w-screen">
      <div className="text-white font-bold text-2xl cursor-pointer ">
        <Link href="/" className="flex items-center gap-2"><Home /> Home</Link>
      </div>
      <div className="text-white mr-4 cursor-pointer">
        <Link href="/tasks">View all Tasks</Link>
      </div>
    </div>
  );
};

export default Navbar;
