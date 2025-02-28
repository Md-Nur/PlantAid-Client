"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ name, route }: { name: string; route?: string }) => {
  const pathname = usePathname();
  const to = route || `/${name}`;
  // console.log(pathname, to);
  const closeNav = () => {
    const inputNav = document.getElementById("my-drawer-3");
    // remove input checkbox
    if (inputNav) {
      (inputNav as HTMLInputElement).checked = false;
    }
  };

  return (
    <li className="list-none" onClick={closeNav}>
      <Link
        className={`${pathname === to ? "font-bold underline" : ""} text-xl`}
        href={to}
      >
        {name.toUpperCase()}
      </Link>
    </li>
  );
};

export default NavLink;
