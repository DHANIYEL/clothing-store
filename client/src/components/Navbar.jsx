import { useLocation, NavLink } from "react-router-dom";
import ExIphoneLogo from "./ExIphoneLogo";
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser, AiOutlineHistory, AiOutlineLogout } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiDashboardLine } from "react-icons/ri";
import OutsideTouchCloseComponent from "./OutsideTouchCloseComponent";

const NavBar = ({ user, toggleDropDown, dropDown, handleLogout, toggleSideNavbar }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className={`flex z-10 absolute items-center justify-between py-5 px-5 lg:px-40 font-bold bg-white text-gray-500 w-full`}>
      <div className=" flex items-center cursor-pointer opacity-70 hover:opacity-100">
        <ExIphoneLogo />
      </div>
      <div className="hidden lg:flex gap-10">
        {!user ? (
          <>
            <NavLink className="hover:text-blue-400 px-2 py-1" to="/">
              Home
            </NavLink>
            <NavLink className="hover:text-blue-400 px-2 py-1" to="/contact">
              Contact
            </NavLink>
            <NavLink className="hover:text-blue-400 px-2 py-1" to="/about">
              About
            </NavLink>
            <NavLink className="hover:text-blue-400 px-2 py-1" to="/Product">
              Product
            </NavLink>
          </>
        ) : (
          <>
            {/* Additional logged-in navigation links can be added here */}
          </>
        )}
      </div>
      <div className="flex sm:gap-6 items-center relative">
        {user ? (
          <>
            <NavLink to="/" className="hover:text-blue-400 p-2">
              <AiOutlineHome className="text-xl" />
            </NavLink>
            <NavLink to="/cart" className="hover:text-blue-400 p-2">
              <AiOutlineShoppingCart className="text-xl" />
            </NavLink>
            <NavLink to="/dashboard/wishlist" className="hover:text-blue-400 p-2">
              <AiOutlineHeart className="text-xl" />
            </NavLink>
            <button className="hover:text-blue-400 sm:hidden" onClick={toggleSideNavbar}>
              <GiHamburgerMenu className="text-xl" />
            </button>
            <button className="hover:text-blue-400 hidden sm:block" onClick={toggleDropDown}>
              <AiOutlineUser className="text-xl" />
            </button>

            {dropDown && (
              <OutsideTouchCloseComponent
                toggleVisibility={toggleDropDown}
                style="absolute top-10 right-0 font-normal w-44 bg-white rounded-lg shadow-2xl"
              >
                <NavLink to="/dashboard/" className="navbar-drop-ul" onClick={toggleDropDown}>
                  <RiDashboardLine className="text-xl" /> Dashboard
                </NavLink>
                <NavLink to="/dashboard/profile" className="navbar-drop-ul" onClick={toggleDropDown}>
                  <AiOutlineUser className="text-xl" /> Profile
                </NavLink>
                <NavLink to="/dashboard/order-history" className="navbar-drop-ul" onClick={toggleDropDown}>
                  <AiOutlineHistory className="text-xl" /> Order History
                </NavLink>
                <button onClick={handleLogout} className="navbar-drop-ul w-full">
                  <AiOutlineLogout className="text-xl" /> Logout
                </button>
              </OutsideTouchCloseComponent>
            )}
          </>
        ) : (
          <>
            <NavLink className="hover:text-blue-400 py-1 px-2" to="/login">
              Login
            </NavLink>
            <span className="py-1">|</span>
            <NavLink className="hover:text-blue-400 py-1 px-2" to="/register">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
