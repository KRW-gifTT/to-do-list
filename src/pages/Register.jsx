import { Button, Form, Input, message, notification } from "antd";
import {
  Layers,
  Lock,
  Plus,
  FolderPen,
  Mail,
  UserRoundPen,
} from "lucide-react";
import "./Register.css";
import { Link, useNavigate } from "react-router";
import React from "react";
import * as AuthService from "../services/auth.service";

export default function Register() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Something when wrong",
      description: "Register failed.",
      placement: "bottomRight",
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await AuthService.register(values);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      openNotificationWithIcon("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="register">
      {contextHolder}
      <div className="header-register">
        <div className="icon-register">
          <Layers size={20} color="#fff" />
        </div>
        <span className="text-register">To-Do List</span>
      </div>
      <div className="register-card">
        <div className="wrapper-title-register">
          <div className="title-register">Create Account</div>
          <div className="sub-title-register">
            Start organizing your life with To-Do List.
          </div>
        </div>

        <Form
          className="wrapper-form-register"
          layout="horizontal"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="box-form-register"
            layout="vertical"
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input
              className="input-field"
              placeholder="Alex Rivers"
              prefix={<FolderPen size={18} color="#94A3B8" />}
            />
          </Form.Item>

          <Form.Item
            className="box-form-register"
            layout="vertical"
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className="input-field"
              placeholder="alex.rivers@design.com"
              prefix={<Mail size={18} color="#94A3B8" />}
            />
          </Form.Item>

          <Form.Item
            className="box-form-register"
            layout="vertical"
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              className="input-field"
              placeholder="alex.rivers@design.com"
              prefix={<UserRoundPen size={18} color="#94A3B8" />}
            />
          </Form.Item>

          <Form.Item
            className="box-form-register"
            layout="vertical"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="input-field"
              placeholder="••••••••••••"
              prefix={<Lock size={18} color="#94A3B8" />}
            />
          </Form.Item>

          <Form.Item className="box-form-register" label={null}>
            <Button
              className="btn-login"
              type="primary"
              htmlType="submit"
              block
              icon={<Plus size={18} />}
              iconPlacement="end"
            >
              Create Account
            </Button>
          </Form.Item>

          <div className="text-bottom">
            Already have an account?
            <Link className="text-signin" to="/">
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
