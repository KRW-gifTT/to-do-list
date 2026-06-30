import "./SideBar.css";
import { Menu } from "antd";
import { LayoutDashboard, ListTodo, Settings, Layers } from "lucide-react";
import { useNavigate, Outlet, useLocation } from "react-router";

const items = [
  {
    key: "/dashboard",
    icon: <LayoutDashboard size={16} />,
    label: "Dashboard",
  },
  { key: "/mytasks", icon: <ListTodo size={16} />, label: "My Tasks" },
  { key: "/settings", icon: <Settings size={16} />, label: "Settings" },
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="wrapper-sidebar">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="icon-sidebar">
            <Layers size={20} color="#fff" />
          </div>
          <span className="text-sidebar">To-Do List</span>
        </div>

        <Menu
          className="sidebar-menu"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          items={items}
          selectedKeys={[location.pathname]}
          onSelect={({ key }) => navigate(key)}
        />
      </div>
      <div className="wrapper-outlet">
        <Outlet />
      </div>
    </div>
  );
};
export default App;
