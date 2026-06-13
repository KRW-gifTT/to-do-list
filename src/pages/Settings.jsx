import "./Settings.css";
import { Bell, KeyRound, User, Palette, ShieldCheck } from "lucide-react";
import avatar from "../assets/image/avatar.jpg";
import { Switch } from "antd";
import { useState } from "react";
import ProfileAppbar from "../components/ProfileAppbar";

export default function Settings({ activeSection }) {
  const [isOn, setIsOn] = useState(false);
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setIsOn(checked);
  };

  return (
    <div id="settings">
      <div className="header-setting">
        <input
          className="text-field"
          type="text"
          placeholder="Search tasks..."
        />

        <div className="wrapper">
          <div className="wrapper-btn">
            <Bell size={18} color="#64748B" />
          </div>

          <ProfileAppbar />
        </div>
      </div>

      <div className="wrapper-content">
        <div className="menu-settings">
          <a
            className={activeSection === "profile" ? "active" : ""}
            href="#profile"
          >
            <User size={18} />
            Profile
          </a>

          <a
            className={activeSection === "notifications" ? "active" : ""}
            href="#notifications"
          >
            <Bell size={18} />
            Notifications
          </a>
          <a
            className={activeSection === "appearance" ? "active" : ""}
            href="#appearance"
          >
            <Palette size={18} />
            Appearance
          </a>
          <a
            className={activeSection === "security" ? "active" : ""}
            href="#security"
          >
            <ShieldCheck size={18} />
            Security
          </a>
        </div>

        <div className="container">
          <div id="profile">
            <div className="wrapper-personal">
              <div className="personal-profile">Personal Profile</div>
              <button className="btn-save">Save Changes</button>
            </div>

            <div className="wrapper-avatar">
              <div className="wrapper-pic">
                <img className="pic" src={avatar} alt="avatar" />
              </div>

              <div className="wrapper-name">
                <div className="name">Korawan Phuwiang</div>
                <div className="message">
                  Update your photo and personal details here.
                </div>
                <input
                  className="change-avatar"
                  placeholder="Insert avatar url"
                ></input>
              </div>
            </div>

            <div className="information">
              <div className="wrapper-fullname">
                <div className="header-infor">FULL NAME</div>
                <input
                  className="field-name"
                  type="text"
                  placeholder="Yourname"
                />
              </div>

              <div className="wrapper-email">
                <div className="header-infor">EMAIL ADDRESS</div>
                <input
                  className="field-name"
                  type="text"
                  placeholder="Your Email"
                />
              </div>
            </div>

            <div className="wrapper-bio">
              <div className="header-infor">BIO</div>
              <input className="field-bio" type="text" placeholder="Your Bio" />
            </div>
          </div>

          <div className="wrapper-noti-app">
            <div id="notifications">
              <div className="header">Notifications</div>
              <div className="wrapper-details">
                <div className="details">
                  <div>
                    <div className="topic">Email Notifications</div>
                    <div className="sub-detail">
                      Receive weekly task summaries
                    </div>
                  </div>
                  <div>
                    <Switch checked={isOn} onChange={onChange} disabled />
                  </div>
                </div>

                <div className="details">
                  <div>
                    <div className="topic">Push Notifications</div>
                    <div className="sub-detail">
                      On-screen alerts for new tasks
                    </div>
                  </div>
                  <div>
                    <Switch checked={isOn} onChange={onChange} disabled />
                  </div>
                </div>

                <div className="details">
                  <div>
                    <div className="topic">Desktop Sounds</div>
                    <div className="sub-detail">Play sound on notification</div>
                  </div>
                  <div>
                    <Switch checked={isOn} onChange={onChange} disabled />
                  </div>
                </div>
              </div>
            </div>
            <div id="appearance">
              <div className="header">Appearance</div>
              <div className="theme-selection">Theme Selection</div>
              <div className="theme-color">
                <div className="theme-white">
                  <div className="white">
                    <div className="in-white"></div>
                  </div>
                  <div className="theme-name">Light</div>
                </div>
                <div className="theme-amethyst">
                  <div className="amethyst">
                    <div className="in-amethyst"></div>
                  </div>
                  <div className="theme-name">Amethyst</div>
                </div>
                <div className="theme-dark">
                  <div className="dark">
                    <div className="in-dark"></div>
                  </div>
                  <div className="theme-name">Dark</div>
                </div>
              </div>
            </div>
          </div>

          <div id="security">
            <div className="header">Security & Privacy</div>
            <div className="box-pass">
              <div className="box-box">
                <div className="wrapper-icon">
                  <KeyRound size={24} color="#F1E9FE" fill="#9966CC" />
                </div>
                <div className="wrapper-pass">
                  <div className="password">Password</div>
                  <div className="desc-pass">Last changed 3 months ago</div>
                </div>
              </div>

              <button className="btn-pass">Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
