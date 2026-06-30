import {
  Flex,
  Space,
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
} from "antd";
import React from "react";

import { Layers, Plus } from "lucide-react";
import "./NewTasks.css";

// const options = [
//   { label: "Apple", value: "Apple" },
//   { label: "Pear", value: "Pear" },
//   { label: "Orange", value: "Orange" },
// ];

export default function Newtasks({ isModalOpen, handleOk, handleCancel }) {
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

  const [status, setStatus] = React.useState("TODO");
  const [priority, setPriority] = React.useState("low");

  return (
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
      footer={null}
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

            <input className="input-category"></input>
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

        {/* <div className="wrapper-status-prio">
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
          <Flex vertical gap="medium">
            <Radio.Group
              block
              options={options}
              defaultValue="Apple"
              optionType="button"
              buttonStyle="solid"
            />
          </Flex>
        </div> */}

        {/* <div className="wrapper-status-prio">
          <div className="title-name">Priority</div>
          <div className="wrapper-btn-newtasks">
            <Button className="btn-priority">
              <div className="dot-low"></div>Low
            </Button>
            <Button className="btn-priority">
              <div className="dot-medium"></div>Medium
            </Button>
            <Button className="btn-priority">
              <div className="dot-high"></div>High
            </Button>
          </div>
        </div> */}

        <div className="wrapper-status-prio">
          <div className="title-name">Status</div>
          <Radio.Group
            className="wrapper-btn-newtasks"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <Radio.Button className="btn-status" value="TODO">
              <div className="dot-purple"></div>To Do
            </Radio.Button>
            <Radio.Button className="btn-status" value="IN_PROGRESS">
              <div className="dot-blue"></div>In Progress
            </Radio.Button>
            <Radio.Button className="btn-status" value="DONE">
              <div className="dot-green"></div>Done
            </Radio.Button>
          </Radio.Group>
        </div>

        <div className="wrapper-status-prio">
          <div className="title-name">Priority</div>
          <Radio.Group
            className="wrapper-btn-newtasks"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <Radio.Button className="btn-priority" value="low">
              <div className="dot-low"></div>Low
            </Radio.Button>
            <Radio.Button className="btn-priority" value="medium">
              <div className="dot-medium"></div>Medium
            </Radio.Button>
            <Radio.Button className="btn-priority" value="high">
              <div className="dot-high"></div>High
            </Radio.Button>
          </Radio.Group>
        </div>

        <div className="wrapper-status-prio">
          <div className="title-name">Description</div>
          <textarea
            className="desx-newtasks"
            type="text"
            placeholder="Briefly describe the task requirements..."
          ></textarea>
        </div>

        <div className="btn-buttom">
          <Button className="btn-cancel-nt" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="btn-create-nt" type="primary" onClick={handleOk}>
            <Plus size={18} /> Create Task
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
