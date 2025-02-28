"use client";
import { ReactNode } from "react";
import { IoMdMenu } from "react-icons/io";
import NavRoutes from "./NavRoutes";
import Link from "next/link";
import Image from "next/image";

const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full bg-base-100 sticky top-0 z-30 shadow-lg">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <IoMdMenu className="w-7 h-7" />
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <Link href="/">
              <Image
                src={"/logo.png"}
                alt="IEEE RUSB Logo"
                width={80}
                height={80}
                className="cursor-pointer w-20 h-20"
              />
            </Link>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">প্ল্যান্ট এইড</h1>
          </div>

          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <NavRoutes />
            </ul>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <NavRoutes />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
