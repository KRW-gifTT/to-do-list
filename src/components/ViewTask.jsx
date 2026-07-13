import { Button, Form, Modal, Input, Flex, DatePicker, Radio } from "antd";
import dayjs from "dayjs";
import "./ViewTask.css";
import * as TasksService from "../services/tasks.service";
import React from "react";
import { Layers, X } from "lucide-react";

const { TextArea } = Input;

export default function ViewTask({ open, onClose, task }) {
  const [form] = Form.useForm();
  const [taskDetails, setTaskDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchTaskDetails = async (taskId) => {
    try {
      setLoading(true);
      const response = await TasksService.getTaskById(taskId);
      console.log("RAW DATA:", JSON.stringify(response.data.data, null, 2));
      setTaskDetails(response.data.data);
      form.setFieldsValue({
        title: response.data.data.title,
        category: response.data.data.category,
        due_date: response.data.data.due_date
          ? dayjs(response.data.data.due_date)
          : null,
        status: response.data.data.status,
        priority: response.data.data.priority,
        description: response.data.data.description,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (open && task?.id) {
      fetchTaskDetails(task.id);
    }
  }, [open, task?.id]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closeIcon={null}
      width={436}
      className="view-task-modal"
      title={
        <div className="view-task-header">
          <div className="view-task-title-container">
            <div className="view-task-icon">
              <Layers color="#fff" />
            </div>
            <div className="view-task-wrapper">
              <div className="view-task-title">Task Details</div>
              <div className="view-task-title-desc">
                View and manage task information.
              </div>
            </div>
          </div>

          <div className="view-task-close-btn">
            <Button
              className="btn-close"
              shape="circle"
              onClick={onClose}
              type="text"
            >
              <X size={14} color="#64748B" />
            </Button>
          </div>
        </div>
      }
    >
      <Form
        className="wrapper-form-viewtask"
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
        disabled
      >
        <Form.Item label="Task Name" name="title" className="form-title-view">
          <Input className="input-view" placeholder="Design System Audit" />
        </Form.Item>

        <div className="container-fill">
          <div className="form-title-view-task">
            <div className="text-title">Category</div>
            <Form.Item name="category" noStyle>
              <Input className="input-view-category" placeholder="Planning" />
            </Form.Item>
          </div>
          <div className="form-title-view-task">
            <div className="text-title">Due Date</div>
            <Flex
              className="custom-date-view"
              gap="small"
              justify="flex-start"
              align="flex-start"
              vertical
              style={{ width: 180 }}
            >
              <Form.Item name="due_date" noStyle>
                <DatePicker />
              </Form.Item>
            </Flex>
          </div>
        </div>

        <div className="wrapper-status-priority-view">
          <div className="text-title">Status</div>
          <Form.Item name="status" noStyle>
            <Radio.Group className="wrapper-btn-view">
              <Radio.Button className="btn-status-view" value="TODO">
                <div className="dot-purple-view"></div>To Do
              </Radio.Button>
              <Radio.Button className="btn-status-view" value="IN_PROGRESS">
                <div className="dot-blue-view"></div>In Progress
              </Radio.Button>
              <Radio.Button className="btn-status-view" value="DONE">
                <div className="dot-green-view"></div>Done
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="wrapper-status-priority-view">
          <div className="text-title">Priority</div>
          <Form.Item name="priority" noStyle>
            <Radio.Group className="wrapper-btn-view">
              <Radio.Button className="btn-status-view" value="LOW">
                <div className="dot-low-view"></div>Low
              </Radio.Button>
              <Radio.Button className="btn-status-view" value="MEDIUM">
                <div className="dot-medium-view"></div>Medium
              </Radio.Button>
              <Radio.Button className="btn-status-view" value="HIGH">
                <div className="dot-high-view"></div>High
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="wrapper-status-priority-view">
          <div className="text-title">Description</div>
          <Form.Item name="description" noStyle>
            <TextArea
              className="view-description"
              placeholder="Enter task description"
            />
          </Form.Item>
        </div>

        {/* <div className="wrapper-btn-viewtask">
          <Button className="btn-view-close" onClick={onClose}>
            Close
          </Button>
          <Button type="primary" className="btn-view-edit">
            <SquarePen /> Edit Task
          </Button>
        </div> */}
      </Form>
    </Modal>
  );
}
