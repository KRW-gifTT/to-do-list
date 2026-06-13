import "./Login.css";
import { Button, Form, Input, notification } from "antd";
import { Layers, Search, Lock, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import React from "react";
import * as AuthService from "../services/auth.service";

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      title: "Something when wrong",
      description: "Email or Password is invalid.",
      placement: "bottomRight",
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await AuthService.login(values);
      if (res) {
        const data = res.data.data;
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        navigate("/dashboard");
      }
    } catch (error) {
      openNotificationWithIcon("error");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div id="login">
      {contextHolder}
      <div className="header-login">
        <div className="icon-login">
          <Layers size={20} color="#fff" />
        </div>
        <span className="text-login">To-Do List</span>
      </div>
      <div className="login-card">
        <div className="wrapper-title">
          <div className="title">Welcome Back</div>
          <div className="sub-title">Manage your tasks with elegance.</div>
        </div>

        <Form
          className="wrapper-form"
          layout="horizontal"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="box-form"
            layout="vertical"
            label="Email Address"
            name="username"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className="input-field"
              placeholder="alex.rivers@design.com"
              prefix={<Search size={18} color="#94A3B8" />}
            />
          </Form.Item>

          <Form.Item
            className="box-form"
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

          <Form.Item className="box-form" label={null}>
            <Button
              className="btn-login"
              type="primary"
              htmlType="submit"
              block
              icon={<Plus size={18} />}
              iconPlacement="end"
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="text">
            Don't have an account?
            <Link className="text-regist" to="/register">
              Create an account
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
