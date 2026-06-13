import { LogOut } from "lucide-react";
import avatar from "../assets/image/avatar.jpg";
import { useNavigate } from "react-router";
import React from "react";
import * as AuthService from "../services/auth.service";

export default function ProfileAppbar() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      const payload = {
        refresh_token: localStorage.getItem("refresh_token"),
      };
      await AuthService.logout(payload);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="profile">
        <span className="name-avatar">Korawan</span>
        <img className="avatar-pic" src={avatar} alt="avatar" />
      </div>
      <div className="btn-logout" onClick={logout}>
        <LogOut size={20} color="#64748B" />
      </div>
    </>
  );
}
