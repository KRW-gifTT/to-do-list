import { Bell, Plus, Ellipsis, Dot } from "lucide-react";
import "./MyTasks.css";
import { Button, Table, Tag } from "antd";
import ProfileAppbar from "../components/ProfileAppbar";
import Newtasks from "../components/NewTasks";
import React from "react";

const columns = [
  {
    title: "TASKNAME",
    dataIndex: "taskname",
    key: "taskname",
    render: (text, { priority }) => {
      const color = {
        low: "#64748B",
        medium: "#8B53BD",
        high: "#EF4444",
      };
      return (
        <div className="dot-icon">
          <Dot size={40} color={color[priority.toLowerCase()]} />
          {text}
        </div>
      );
    },
  },
  {
    title: "PIORITY",
    dataIndex: "priority",
    key: "priority",
    render: (text) => {
      const color = {
        low: "#64748B",
        medium: "#8B53BD",
        high: "#EF4444",
      };
      return (
        <Tag className="tag-priority" color={color[text.toLowerCase()]}>
          {text.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "DUE DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (text) => {
      const color = {
        TODO: "#CBD5E1",
        IN_PROGRESS: "#60A5FA",
        DONE: "#10B981",
      };
      const label = {
        TODO: "To Do",
        IN_PROGRESS: "In Progress",
        DONE: "Done",
      };
      return (
        <div className="dot-icon">
          <Dot size={40} color={color[text]} />
          {label[text]}
        </div>
      );
    },
  },
  {
    title: "",
    key: "action",
    render: () => <Ellipsis color="#CBD5E1" />,
  },
];

const data = [
  {
    key: "1",
    taskname: "Create Brand Palette",
    priority: "low",
    date: "New York No. 1 Lake Park",
    status: "IN_PROGRESS",
  },
  {
    key: "2",
    taskname: "Draft User Journey",
    priority: "medium",
    date: "London No. 1 Lake Park",
    status: "TODO",
  },
  {
    key: "3",
    taskname: "Sidebar Implementation",
    priority: "high",
    date: "Sydney No. 1 Lake Park",
    status: "DONE",
  },
];

export default function Mytasks() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="mytask">
      <div className="header-dashboard">
        <input
          className="text-field"
          type="text"
          placeholder="Search tasks..."
        />

        <div className="wrapper">
          <div className="wrapper-btn">
            <Bell size={18} color="#64748B" />
            <button className="btn-newtask" onClick={showModal}>
              <Plus size={18} />
              New Task
            </button>
          </div>

          <ProfileAppbar />
        </div>
        <Newtasks
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>

      <div className="wrapper-header">
        <div className="header-mytasks">My Tasks</div>
        <div className="des-header">
          Track and manage your individual contributions.
        </div>
      </div>
      <div className="table-mytasks">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}
