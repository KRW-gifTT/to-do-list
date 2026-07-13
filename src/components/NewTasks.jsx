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

import { Layers, Plus, X } from "lucide-react";
import "./NewTasks.css";
import * as TasksService from "../services/tasks.service";
import dayjs from "dayjs";

// const options = [
//   { label: "Apple", value: "Apple" },
//   { label: "Pear", value: "Pear" },
//   { label: "Orange", value: "Orange" },
// ];

const { TextArea } = Input;

export default function Newtasks({
  isModalOpen,
  handleCancel,
  handleSuccess,
  task,
}) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [newTask, setNewTask] = React.useState({
    title: "",
    description: "",
    category: "",
    status: "",
    priority: "",
    due_date: "",
    progress: 0,
  });
  const [loading, setLoading] = React.useState(false);

  const isEditMode = Boolean(task?.id);

  const submitTask = async () => {
    try {
      setLoading(true);
      if (
        newTask.title === "" ||
        newTask.description === "" ||
        newTask.category === "" ||
        newTask.status === "" ||
        newTask.priority === "" ||
        newTask.due_date === ""
      ) {
        alert("Please fill all the fields");
        return;
      }

      const payload = {
        ...newTask,
        due_date: newTask.due_date
          ? dayjs(newTask.due_date).toISOString()
          : null,
        progress: newTask.progress ?? 0,
      };

      if (isEditMode) {
        await TasksService.updateTask(task.id, payload);
      } else {
        await TasksService.createTask(payload);
      }
      handleSuccess();
    } catch (error) {
      console.log("Error status:", error.response?.status);
      console.log("Error data:", error.response?.data);
      console.log("Full error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isModalOpen) {
      if (isEditMode) {
        setNewTask({
          title: task.title || "",
          description: task.description || "",
          category: task.category || "",
          status: task.status || "",
          priority: task.priority || "",
          due_date: task.due_date || "",
          progress: task.progress ?? 0,
        });
        console.log(task);
      } else {
        setNewTask({
          title: "",
          description: "",
          category: "",
          status: "",
          priority: "",
          due_date: "",
        });
        console.log(task);
      }
    }
  }, [isModalOpen, task]);

  return (
    <Modal
      className="modal-container"
      title={
        <div className="box-title-newtasks">
          <div className="container-title-newtasks">
            <div className="icon-layers">
              <Layers color="#fff" />
            </div>
            <div className="wrapper-title-newtasks">
              <div className="title-newtasks">
                {" "}
                {isEditMode ? "Edit Task" : "New Task"}
              </div>
              <div className="desc-newtasks">
                {" "}
                {isEditMode
                  ? "Modify the existing objective for the project."
                  : "Assign a new objective to the project."}
              </div>
            </div>
          </div>

          <div className="wrapper-btn-close">
            <Button className="btn-close" shape="circle" onClick={handleCancel}>
              <X size={14} color="#64748B" />
            </Button>
          </div>
        </div>
      }
      open={isModalOpen}
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

          // rules={[
          //   { required: true, message: "Please input your username!" },
          // ]}
        >
          <Input
            className="input-taskname"
            placeholder="e.g. Design System Audit"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </Form.Item>

        <div className="container-fill">
          <div className="box-fill">
            <div className="title-name">Category</div>

            <Input
              type="text"
              placeholder="e.g. Design"
              className="input-category"
              value={newTask.category}
              onChange={(e) =>
                setNewTask({ ...newTask, category: e.target.value })
              }
            ></Input>
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
              <DatePicker
                value={newTask.due_date ? dayjs(newTask.due_date) : null}
                onChange={(date) => setNewTask({ ...newTask, due_date: date })}
              />
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
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
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
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            <Radio.Button className="btn-priority" value="LOW">
              <div className="dot-low"></div>Low
            </Radio.Button>
            <Radio.Button className="btn-priority" value="MEDIUM">
              <div className="dot-medium"></div>Medium
            </Radio.Button>
            <Radio.Button className="btn-priority" value="HIGH">
              <div className="dot-high"></div>High
            </Radio.Button>
          </Radio.Group>
        </div>

        <div className="wrapper-status-prio">
          <div className="title-name">Description</div>
          <TextArea
            className="desx-newtasks"
            type="text"
            placeholder="Briefly describe the task requirements..."
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
        </div>

        <div className="btn-buttom">
          <Button className="btn-cancel-nt" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className="btn-create-nt"
            type="primary"
            onClick={submitTask}
            loading={loading}
            icon={<Plus size={18} />}
          >
            {isEditMode ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
