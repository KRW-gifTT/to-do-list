import { Dropdown } from "antd";
import "./DropdownTask.css";
import { Pencil, Trash2, View } from "lucide-react";

const items = [
  {
    label: "Edit Task",
    key: "edit",
    icon: <Pencil size={16} color="#8B53BD" />,
  },
  {
    label: "View Task",
    key: "view",
    icon: <View size={16} color="#8B53BD" />,
  },
  {
    label: "Delete",
    key: "delete",
    icon: <Trash2 size={16} color="#8B53BD" />,
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
