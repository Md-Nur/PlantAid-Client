"use client";
import NavDropdown from "./NavDropdown";
import NavLink from "./NavLink";

const NavRoutes = () => {
  return (
    <>
      <NavLink name="হোম" route="/" />
      <NavDropdown
        name="ফসল"
        routes={[
          { name: "আলু", url: "/potato" },
          { name: "টমেটো", url: "/tomato" },
          { name: "মরিচ", url: "/pepper" },
        ]}
      />
      <NavLink name="কেনাকাটা" route="/store" />
      <NavLink name="নিকটস্থ কৃষিবিদ" route="/agronomist" />
    </>
  );
};

export default NavRoutes;
