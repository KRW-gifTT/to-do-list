import { Dropdown } from "antd";
import "./DropdownTask.css";
import { Pencil, Copy, ArrowRightLeft } from "lucide-react";

const items = [
  {
    label: "Edit Task",
    key: "edit",
    icon: <Pencil size={16} color="#8B53BD" />,
  },
  {
    label: "Duplicate",
    key: "duplicate",
    icon: <Copy size={16} color="#8B53BD" />,
  },
  {
    label: "Move to...",
    key: "move",
    icon: <ArrowRightLeft size={16} color="#8B53BD" />,
  },
];

export default function DropdownTask({ children, onMenuClick }) {
  return (
    <Dropdown
      menu={{
        items,
        onClick: onMenuClick,
        rootClassName: "task-dropdown-menu",
      }}
      trigger={["click"]}
      placement="bottomLeft"
    >
      {children}
    </Dropdown>
  );
}
