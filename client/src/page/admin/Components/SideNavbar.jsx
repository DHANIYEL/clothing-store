import React, { useState } from "react";
import ExIphoneLogo from "../../../components/ExIphoneLogo";
import { NavLink, useNavigate } from "react-router-dom";

import { RiDashboardLine } from "react-icons/ri";
import { FiBox, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { HiOutlineTicket } from "react-icons/hi";
import { BsCardChecklist, BsCreditCard } from "react-icons/bs";
import { AiOutlineTags } from "react-icons/ai";
import { FaUsersCog, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/userActions";
import ConfirmationModal from "../../../components/LogoutConfirmationModal";

const SideNavbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Function to handle logout click
  const handleLogoutClick = () => {
    setModalOpen(true); // Show the confirmation modal
  };

  // Function to confirm logout and proceed
  const confirmLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect after logout
    setModalOpen(false); // Close the modal
  };

  // Function to cancel logout
  const cancelLogout = () => {
    setModalOpen(false); // Close the modal without logging out
  };

  return (
    <>
      <div className="w-7 flex items-center cursor-pointer opacity-70 hover:opacity-100">
        <ExIphoneLogo />
      </div>
      <div className="text-gray-600 font-semibold mt-5">
        <p className="side-nav-sub-title">Menu</p>
        <NavLink className="side-nav-link-sp" to="/admin/">
          <RiDashboardLine />
          Dashboard
        </NavLink>
        <NavLink className="side-nav-link-sp" to="products">
          <FiBox />
          Products
        </NavLink>
        <NavLink className="side-nav-link-sp" to="categories">
          <ImStack />
          Category
        </NavLink>
        <NavLink className="side-nav-link-sp" to="orders">
          <BsCardChecklist />
          Orders
        </NavLink>
        <NavLink className="side-nav-link-sp" to="coupon">
          <HiOutlineTicket />
          Coupon
        </NavLink>
        <NavLink className="side-nav-link-sp" to="banner">
          <AiOutlineTags />
          Banner
        </NavLink>
        <NavLink className="side-nav-link-sp" to="payments">
          <BsCreditCard />
          Payments
        </NavLink>
        <p className="side-nav-sub-title">User Management</p>
        {user && user.role === "superAdmin" && (
          <NavLink className="side-nav-link-sp" to="manageAdmins">
            <FaUsersCog />
            Manage Admins
          </NavLink>
        )}
        <NavLink className="side-nav-link-sp" to="customers">
          <FaUsers />
          Customers
        </NavLink>
        <p className="side-nav-sub-title">Other</p>
        <NavLink className="side-nav-link-sp" to="settings">
          <FiSettings />
          Settings
        </NavLink>
        <NavLink className="side-nav-link-sp" to="help">
          <FiHelpCircle />
          Help
        </NavLink>
        <button
          className="side-nav-link-sp cursor-pointer w-full"
          onClick={handleLogoutClick}
        >
          <FiLogOut />
          Logout
        </button>
      </div>
            {/* Confirmation modal */}
        <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
        message="Are you sure you want to log out?"
      />
    </>
  );
};

export default SideNavbar;
