import React from "react";
import authService from "../../appwrite/auth_service";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { Button } from "../index";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(dispatch(logout()));
  };

  return (
          <div className="w-{1.5rem}">
                 <Button text="Logout" onClick={handleLogout} />
          </div>
  );
};

export default LogoutBtn;
