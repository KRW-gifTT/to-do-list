import { Bell, Plus, Ellipsis, Dot, Calendar, Search } from "lucide-react";
import "./MyTasks.css";
import { Button, Select, Table, Tag, Input } from "antd";
import ProfileAppbar from "../components/ProfileAppbar";
import Newtasks from "../components/NewTasks";
import React from "react";
import * as TasksService from "../services/tasks.service";
import dayjs from "dayjs";
import DropdownTask from "../components/DropdownTask";
import DeleteTask from "../components/DeleteTask";
import ViewTask from "../components/ViewTask";

export default function Mytasks() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSuccess = () => {
    getTasks({ current: pagination.page, pageSize: pagination.limit });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [loading, setLoading] = React.useState(false);
  const [item, setItem] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [status, setStatus] = React.useState();
  const [priority, setPriority] = React.useState();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);

  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const getTasks = async (paginationConfig) => {
    setLoading(true);
    try {
      const res = await TasksService.getTask({
        page: paginationConfig.current,
        limit: paginationConfig.pageSize,
        search: keyword.trim() || undefined,
        status,
        priority,
      });
      if (res) {
        setItem(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      getTasks({ current: 1, pageSize: pagination.limit });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [keyword, status, priority]);

  const showCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleMenuClick = (key, record) => {
    if (key === "delete") {
      setSelectedTask(record);
      setIsDeleteModalOpen(true);
    } else if (key === "view") {
      setSelectedTask(record);
      setIsViewModalOpen(true);
    } else if (key === "edit") {
      setSelectedTask(record);
      setIsModalOpen(true);
    }
  };

  const handleDeleteSuccess = () => {
    getTasks({ current: pagination.page, pageSize: pagination.limit });
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const columns = [
    {
      title: "TASKNAME",
      dataIndex: "title",
      key: "title",
      render: (text, { priority }) => {
        const color = { low: "#64748B", medium: "#8B53BD", high: "#EF4444" };
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
        const color = { low: "#64748B", medium: "#8B53BD", high: "#EF4444" };
        return (
          <Tag className="tag-priority" color={color[text.toLowerCase()]}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "DUE DATE",
      dataIndex: "due_date",
      key: "due_date",
      render: (text) => (
        <div className="icon-calender">
          <Calendar size={14} color="#94A3B8" />
          {dayjs(text).format("MMM D, YYYY")}
        </div>
      ),
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
      render: (_, record) => (
        <DropdownTask onMenuClick={(e) => handleMenuClick(e.key, record)}>
          <Button
            className="btn-ellipsis-todo"
            type="link"
            onClick={(e) => e.preventDefault()}
          >
            <Ellipsis size={18} color="#CBD5E1" />
          </Button>
        </DropdownTask>
      ),
    },
  ];

  return (
    <div id="mytask">
      <div className="header-dashboard">
        <div className="task-filters">
          <Input
            className="text-field-mytask"
            type="text"
            placeholder="Search tasks..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            prefix={<Search size={16} color="#94A3B8" />}
          />
        </div>

        <div className="wrapper">
          <div className="wrapper-btn">
            <Bell size={18} color="#64748B" />
            <button className="btn-newtask" onClick={showCreateModal}>
              <Plus size={18} />
              New Task
            </button>
          </div>

          <ProfileAppbar />
        </div>
        <Newtasks
          isModalOpen={isModalOpen}
          handleSuccess={handleSuccess}
          handleCancel={handleCancel}
          task={selectedTask}
        />
      </div>

      <div className="wrapper-header">
        <div className="container-header">
          <div className="header-mytasks">My Tasks</div>
          <div className="des-header">
            Track and manage your individual contributions.
          </div>
        </div>

        <div className="select-status-priority">
          <Select
            allowClear
            className="task-filter-select"
            placeholder="Status All"
            value={status}
            onChange={setStatus}
            options={[
              {
                value: "TODO",
                label: (
                  <div className="option-status">
                    <div className="text-options">
                      <div className="dot-todo" />
                      To Do
                    </div>
                  </div>
                ),
              },
              {
                value: "IN_PROGRESS",
                label: (
                  <div className="option-status">
                    <div className="text-options">
                      <div className="dot-progress" />
                      In Progress
                    </div>
                  </div>
                ),
              },
              {
                value: "DONE",
                label: (
                  <div className="option-status">
                    <div className="text-options">
                      <div className="dot-done" />
                      Done
                    </div>
                  </div>
                ),
              },
            ]}
          />
          <Select
            allowClear
            className="task-filter-select"
            placeholder="Priority All"
            value={priority}
            onChange={setPriority}
            options={[
              {
                value: "LOW",
                label: (
                  <div className="option-status">
                    <div className="text-options">
                      <div className="dot-low-option" />
                      Low
                    </div>
                  </div>
                ),
              },
              {
                value: "MEDIUM",
                label: (
                  <div className="option-status">
                    <div className="text-options">
                      <div className="dot-medium-option" />
                      Medium
                    </div>
                  </div>
                ),
              },
              {
                value: "HIGH",
                label: (
                  <div className="option-status">
                    <div className="text-options">
                      <div className="dot-high-option" />
                      High
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className="table-mytasks">
        <Table
          columns={columns}
          dataSource={item}
          rowKey="id"
          onChange={getTasks}
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            showTotal: (total) => `Tasks ${total} Item`,
          }}
        />
      </div>

      <ViewTask
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        task={selectedTask}
      />

      <DeleteTask
        isOpen={isDeleteModalOpen}
        task={selectedTask}
        onCancel={handleDeleteCancel}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
