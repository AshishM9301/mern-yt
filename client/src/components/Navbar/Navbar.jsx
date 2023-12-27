import React from "react";
import { Outlet, Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
      share across all the pages on your site, like navigation. */}
      <nav>
        <ul className="flex justify-end gap-x-4 px-5 py-3">
          <li>
            <Link to="/">Home</Link>
          </li>
          <>
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/sign-up">Register</Link>
                </li>
                <li>
                  <Link to="/sign-in">Login</Link>
                </li>
              </>
            )}
          </>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
      so you can think about this <Outlet> as a placeholder for
      the child routes we defined above. */}
      <Outlet />
    </div>
  );
};

export default Navbar;
