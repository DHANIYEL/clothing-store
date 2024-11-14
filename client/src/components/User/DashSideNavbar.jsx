import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import { RiDashboardLine } from "react-icons/ri";
import {
  AiOutlineHeart,
  AiOutlineWallet,
  AiOutlineLogout,
} from "react-icons/ai";
import { TiTicket } from "react-icons/ti";
import { BiUser, BiHistory } from "react-icons/bi";
import { GiMailbox } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { FiSettings } from "react-icons/fi";
import ConfirmationModal from '../LogoutConfirmationModal'; // Import the new modal component

const DashSideNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to handle logout button click
  const handleLogoutClick = () => {
    setModalOpen(true); // Show the confirmation modal
  };

  // Function to confirm logout and proceed
  const confirmLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect after logout
    setModalOpen(false); // Close the modal
  };

  // Function to cancel the logout
  const cancelLogout = () => {
    setModalOpen(false); // Close the modal without logging out
  };

  return (
    <div className="w-1/5 bg-white h-fit shrink-0 rounded hidden lg:block">
      <NavLink className="side-nav-link-sp" to="/dashboard/">
        <RiDashboardLine />
        Dashboard
      </NavLink>
      <NavLink className="side-nav-link-sp" to="profile">
        <BiUser />
        Account Details
      </NavLink>
      <NavLink className="side-nav-link-sp" to="order-history">
        <BiHistory />
        Order History
      </NavLink>
      <NavLink className="side-nav-link-sp" to="wishlist">
        <AiOutlineHeart />
        Wishlist
      </NavLink>
      <NavLink className="side-nav-link-sp" to="addresses">
        <GiMailbox />
        Addresses
      </NavLink>
      <NavLink className="side-nav-link-sp" to="wallet">
        <AiOutlineWallet />
        Wallet
      </NavLink>
      <NavLink className="side-nav-link-sp" to="find-coupons">
        <TiTicket />
        Find Coupons
      </NavLink>
      <NavLink className="side-nav-link-sp" to="settings">
        <FiSettings />
        Settings
      </NavLink>
      <button className="side-nav-link-sp w-full" onClick={handleLogoutClick}>
        <AiOutlineLogout />
        Logout
      </button>

      {/* Confirmation modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
        message="Are you sure you want to log out?"
      />
    </div>
  );
};

export default DashSideNavbar;
