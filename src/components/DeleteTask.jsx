import { Button, Modal, message } from "antd";
import "./DeleteTask.css";
import * as TasksService from "../services/tasks.service";
import { Trash2 } from "lucide-react";
import React from "react";

export default function DeleteTask({ isOpen, task, onCancel, onSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const handleDelete = async () => {
    try {
      if (!task) return;
      setLoading(true);
      await TasksService.deleteTask(task.id);
      message.success("Task deleted successfully");
      onSuccess();
    } catch (error) {
      console.log(error);
      message.error("Failed to delete task. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={isOpen}
      centered
      onCancel={onCancel}
      footer={null}
      width={336}
      closeIcon={null}
    >
      <div className="delete-task-modal">
        <div className="delete-task-icon">
          <Trash2 color="#8B53BD" size={28} />
        </div>
        <div className="title-delete">Delete Task?</div>
        <div className="desc-delete">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </div>
        <div className="line"></div>
        <div className="delete-task-buttons">
          <Button
            className="btn-delete"
            type="primary"
            onClick={handleDelete}
            loading={loading}
          >
            Delete Task
          </Button>
          <Button className="btn-cancel" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
