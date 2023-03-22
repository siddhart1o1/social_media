import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import { useHistory } from "react-router-dom";
import "./menubar.css";
export default function MenuBar() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="menuBarcontainer">
      <div className="menuBar">
        <div className="menuBarItem" onClick={logout}>
          <ExitToAppIcon></ExitToAppIcon>
          <span className="menuBarItemText">Logout</span>
        </div>
        <div className="menuBarItem">
          <SettingsIcon></SettingsIcon>
          <span className="menuBarItemText">Settings</span>
        </div>
      </div>
    </div>
  );
}
