import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import React from "react";
import * as AuthService from "../services/auth.service";
import "./ProfileAppbar.css";

export default function ProfileAppbar() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState({
    name: "",
    email: "",
    bio: "",
    avatar_url: "",
  });

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    setLoading(true);
    try {
      const res = await AuthService.getMyProfile();
      setProfile({
        name: res.data.data.name,
        avatar_url: `${import.meta.env.VITE_API_URL}${res.data.data.profile_image_url}`,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="profile">
        <span className="name-avatar">{profile.name}</span>
        {profile.avatar_url && (
          <img
            className="profile-appbar-avatar"
            src={profile.avatar_url}
            alt="avatar"
          />
        )}
      </div>
      <div className="btn-logout" onClick={logout}>
        <LogOut size={20} color="#64748B" />
      </div>
    </>
  );
}
