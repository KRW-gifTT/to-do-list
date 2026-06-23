import { Bell, Plus, Ellipsis, Dot, Layers } from "lucide-react";
import "./MyTasks.css";
import {
  Flex,
  Space,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd";
import ProfileAppbar from "../components/ProfileAppbar";
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

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
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
            <Modal
              className="modal-container"
              title={
                <div className="box-title-newtasks">
                  <div className="icon-layers">
                    <Layers color="#fff" />
                  </div>
                  <div className="wrapper-title-newtasks">
                    <div className="title-newtasks">New Task</div>
                    <div className="desc-newtasks">
                      Assign a new objective to the project.
                    </div>
                  </div>
                </div>
              }
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              closeIcon={null}
              width={436}
            >
              <Form
                className="wrapper-form-newtasks"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  className="form-taskname"
                  label="task name"
                  name="username"
                  // rules={[
                  //   { required: true, message: "Please input your username!" },
                  // ]}
                >
                  <Input
                    className="input-taskname"
                    placeholder="e.g. Design System Audit"
                  />
                </Form.Item>

                <div className="container-fill">
                  <div className="box-fill">
                    <div className="title-name">Category</div>
                    <Space wrap>
                      <Select
                        className="custom-select-planning"
                        defaultValue="Planning"
                        style={{ width: 180, height: 50 }}
                        onChange={handleChange}
                        options={[
                          { value: "jack", label: "Jack" },
                          { value: "lucy", label: "Lucy" },
                          { value: "Yiminghe", label: "yiminghe" },
                          {
                            value: "disabled",
                            label: "Disabled",
                            disabled: true,
                          },
                        ]}
                      />
                    </Space>
                  </div>

                  <div className="box-fill">
                    <div className="title-name">Due Date</div>
                    <Flex
                      className="custom-date"
                      gap="small"
                      justify="flex-start"
                      align="flex-start"
                      vertical
                      style={{ width: 180 }}
                    >
                      <DatePicker onChange={onChange} />
                    </Flex>
                  </div>
                </div>

                <div className="wrapper-status-prio">
                  <div className="title-name">Status</div>
                  <div className="wrapper-btn-newtasks">
                    <Button className="btn-status">
                      <div className="dot-purple"></div>To Do
                    </Button>
                    <Button className="btn-status">
                      <div className="dot-blue"></div>In Progress
                    </Button>
                    <Button className="btn-status">
                      <div className="dot-green"></div>Done
                    </Button>
                  </div>
                </div>

                <div className="wrapper-status-prio">
                  <div className="title-name">Priority</div>
                  <div className="wrapper-btn-newtasks">
                    <Button className="btn-priority">
                      <div className="dot-low"></div>Low
                    </Button>
                    <Button className="btn-status">
                      <div className="dot-medium"></div>Medium
                    </Button>
                    <Button className="btn-status">
                      <div className="dot-high"></div>High
                    </Button>
                  </div>
                </div>

                <div className="wrapper-status-prio">
                  <div className="title-name">Description</div>
                  <textarea
                    className="desx-newtasks"
                    type="text"
                    placeholder="Briefly describe the task requirements..."
                  ></textarea>
                </div>
              </Form>
            </Modal>
          </div>

          <ProfileAppbar />
        </div>
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
