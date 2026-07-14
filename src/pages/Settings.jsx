import "./Settings.css";
import { Bell, KeyRound, X, Search } from "lucide-react";
import { Switch, notification, Modal, Form, Input, Button } from "antd";
import React from "react";
import ProfileAppbar from "../components/ProfileAppbar";
import * as AuthService from "../services/auth.service";
import * as ProfileService from "../services/profile.service";

export default function Settings() {
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState({
    name: "",
    email: "",
    bio: "",
    avatar_url: "",
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isOn, setIsOn] = React.useState(false);
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setIsOn(checked);
  };

  const getMyProfile = async () => {
    setLoading(true);
    try {
      const res = await AuthService.getMyProfile();
      setProfile({
        name: res.data.data.name || "",
        email: res.data.data.email || "",
        bio: res.data.data.bio || "",
        avatar_url: res.data.data.avatar_url || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getMyProfile();
  }, []);

  const updateProfile = async () => {
    setLoading(true);
    try {
      await ProfileService.updateProfile(profile);
      openNotificationWithIcon(
        "success",
        "Success",
        "Your profile has been changed.",
      );
    } catch (error) {
      openNotificationWithIcon("error", "Error", "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title, desc) => {
    api[type]({
      title: title,
      description: desc,
      placement: "bottomRight",
    });
  };

  const onChangePassword = async (values) => {
    if (values.new_password !== values.confirm_new_password) {
      openNotificationWithIcon("error", "Oops!", "Password mismatch.");
      return;
    }
    setLoading(true);

    try {
      const res = await AuthService.changePassword(values);
      if (res) {
        openNotificationWithIcon(
          "success",
          "Success",
          "Password changed successfully.",
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      openNotificationWithIcon("error", "Oops!", error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const onChangePasswordFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div id="settings">
      {contextHolder}
      <div className="header-setting">
        <div className="wrapper">
          <div className="wrapper-btn">
            <Bell size={18} color="#64748B" />
          </div>

          <ProfileAppbar />
        </div>
      </div>

      <div className="wrapper-content">
        <div className="container">
          <section id="profile">
            <div className="wrapper-personal">
              <div className="personal-profile">Personal Profile</div>
              <button className="btn-save" onClick={updateProfile}>
                {loading ? "Loading..." : "Save Changes"}
              </button>
            </div>

            <div className="wrapper-avatar">
              <div className="wrapper-pic">
                <img className="pic" src={profile.avatar_url} alt="avatar" />
              </div>

              <div className="wrapper-name">
                <div className="name">{profile.name}</div>
                <div className="message">
                  Update your photo and personal details here.
                </div>
                <Input
                  className="change-avatar"
                  placeholder="Insert avatar url"
                  defaultValue={profile.avatar_url}
                  onChange={(e) =>
                    setProfile({ ...profile, avatar_url: e.target.value })
                  }
                ></Input>
              </div>
            </div>

            <div className="information">
              <div className="wrapper-fullname">
                <div className="header-infor">USER NAME</div>
                <Input
                  className="field-name"
                  type="text"
                  placeholder="Yourname"
                  defaultValue={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </div>

              <div className="wrapper-email">
                <div className="header-infor">EMAIL ADDRESS</div>
                <Input
                  className="field-name"
                  type="text"
                  placeholder="Your Email"
                  defaultValue={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="wrapper-bio">
              <div className="header-infor">BIO</div>
              <textarea
                className="field-bio"
                type="text"
                placeholder="Your Bio"
                defaultValue={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
              />
            </div>
          </section>

          <div className="wrapper-noti-app">
            <section id="notifications">
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
            </section>
            <section id="appearance">
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
            </section>
          </div>

          <section id="security">
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

              <button className="btn-pass" onClick={showModal}>
                Change Password
              </button>
              <Modal
                className="changepass-modal"
                title={
                  <div className="wrapper-title-changepass">
                    <div className="title-changepass">
                      <div className="icon-key">
                        <KeyRound fill="#9966CC" color="#F1E9FE" size={24} />
                      </div>
                      Change Password
                    </div>

                    <div className="wrapper-btn-X">
                      <Button
                        className="btn-X"
                        shape="circle"
                        onClick={handleCancel}
                      >
                        <X size={14} color="#64748B" />
                      </Button>
                    </div>
                  </div>
                }
                open={isModalOpen}
                // onOk={handleOk}
                // onCancel={handleCancel}
                closeIcon={null}
                width={425}
                footer={null}
              >
                <div className="desc-changepass">
                  Your new password must be at least 8 characters long and
                  include a mix of letters, numbers, and symbols.
                </div>
                <Form
                  className="wrapper-change-password-form"
                  name="basic"
                  layout="horizontal"
                  initialValues={{ remember: true }}
                  onFinish={onChangePassword}
                  onFinishFailed={onChangePasswordFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    className="change-password-form-item wrapper-button-form"
                    label="Current Password"
                    layout="vertical"
                    name="current_password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="input-field-password"
                      placeholder="••••••••••••"
                    />
                  </Form.Item>

                  <Form.Item
                    className="change-password-form-item wrapper-button-form"
                    label="New Password"
                    layout="vertical"
                    name="new_password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="input-field-password"
                      placeholder="••••••••••••"
                    />
                  </Form.Item>

                  <Form.Item
                    className="change-password-form-item wrapper-button-form"
                    label="Confirm New Password"
                    layout="vertical"
                    name="confirm_new_password"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="input-field-password"
                      placeholder="••••••••••••"
                    />
                  </Form.Item>

                  <Form.Item label={null} className="wrapper-button-form">
                    <Button
                      className="btn-update-password"
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                    >
                      Update Password
                    </Button>

                    <Button
                      className="btn-cancel-password"
                      block
                      loading={loading}
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
