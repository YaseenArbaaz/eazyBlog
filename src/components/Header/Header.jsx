import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    {
      name: "login",
      slug: "/login",
      active: !authStatus,
    },

    {
      name: "signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Add post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "All post",
      slug: "/all-Post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-slate-300 dark:bg-slate-600 text-gray-600 dark:text-gray-900 w-full fixed top-0 z-10">
      <Container>
        <nav className="flex flex-row justify-between px-10 items-center py-4">
          <div className="icon">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="list-none flex flex-row gap-4 justify-center items-center">
            {
              navItems.map((navItem) => 
                navItem.active ?(
                  <li key={navItem.name} >
                    <button onClick={() => navigate(navItem.slug)}>
                      {navItem.name}
                    </button>
                  </li>) : null
                )
             }

            {authStatus && (
              <li className="">
                  <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
