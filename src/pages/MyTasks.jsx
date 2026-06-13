import { Bell, Plus } from "lucide-react";
import "./MyTasks.css";
import { Flex, Space, Table, Tag } from "antd";
import ProfileAppbar from "../components/ProfileAppbar";

const columns = [
  {
    title: "TASKNAME",
    dataIndex: "taskname",
    key: "taskname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "PIORITY",
    dataIndex: "priority",
    key: "priority",
    render: (_, { tags }) => (
      <Flex gap="small" align="center" wrap>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "kawaii") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </Flex>
    ),
  },
  {
    title: "DUE DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="medium">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    taskname: "John Brown",
    priority: 32,
    date: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["kawaii"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default function Mytasks() {
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
            <button className="btn-newtask">
              <Plus size={18} />
              New Task
            </button>
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
