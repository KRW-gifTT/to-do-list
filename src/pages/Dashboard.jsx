import "./Dashboard.css";
import CardTodo from "../components/CardTodo";
import CardProgress from "../components/CardProgress";
import CardDone from "../components/CardDone";
import { Plus, Bell, CirclePlus } from "lucide-react";
import ProfileAppbar from "../components/ProfileAppbar";
import Newtasks from "../components/NewTasks";
import { Button } from "antd";
import React from "react";
import * as TasksService from "../services/tasks.service";
import DeleteTask from "../components/DeleteTask";
import ViewTask from "../components/ViewTask";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  const [count, setCount] = React.useState({
    done: 0,
    in_progress: 0,
    to_do: 0,
  });

  const [boards, setBoards] = React.useState({
    done: [],
    in_progress: [],
    to_do: [],
  });

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
    getDashboard();
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedTask();
  };
  const handleOk = () => {
    setIsModalOpen(false);
    getDashboard();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getDashboard = async () => {
    try {
      setLoading(true);
      const res = await TasksService.getDashboard();
      if (res) {
        setCount(res.data.data.counts);
        setBoards(res.data.data.board);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getDashboard();
  }, []);

  React.useEffect(() => {
    if (keyword.length === 0) {
      getDashboard();
    } else {
      const to_do = boards.to_do.filter((value) =>
        value.title.includes(keyword),
      );
      const in_progress = boards.in_progress.filter((value) =>
        value.title.includes(keyword),
      );
      const done = boards.done.filter((value) => value.title.includes(keyword));
      setBoards({ to_do, in_progress, done });
    }
  }, [keyword]);

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
      console.log(record);
    }
  };

  return (
    <div id="dashboard">
      <div className="header-dashboard">
        <input
          className="text-field"
          type="text"
          placeholder="Search tasks..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
          handleCancel={handleCancel}
          task={selectedTask}
          handleSuccess={handleOk}
        />
      </div>

      <div className="kanbanboard">
        <div className="lane">
          <div className="wrapper-lane-header">
            <div className="lane-header">
              <div className="circle-todo"></div>TO DO
            </div>
            <span className="count">{count.to_do}</span>
          </div>

          <div className="lane-content">
            {boards.to_do.map((value) => (
              <CardTodo
                task={value}
                key={value.id}
                handleMenuClick={handleMenuClick}
              />
            ))}
          </div>

          <Button className="btn-newtask-bottom" onClick={showModal}>
            <CirclePlus size={20} fill="#D1B9FA" color="#fff" />
            Add New Task
          </Button>
        </div>

        <div className="lane">
          <div className="wrapper-lane-header">
            <div className="lane-header">
              <div className="circle-progress"></div>IN PROGRESS
            </div>
            <span className="count">{count.in_progress}</span>
          </div>
          <div className="lane-content">
            {boards.in_progress.map((value) => (
              <CardProgress
                task={value}
                key={value.id}
                handleMenuClick={handleMenuClick}
              />
            ))}
          </div>
        </div>

        <div className="lane">
          <div className="wrapper-lane-header">
            <div className="lane-header">
              <div className="circle-done"></div>DONE
            </div>
            <span className="count">{count.done}</span>
          </div>
          <div className="lane-content">
            {boards.done.map((value) => (
              <CardDone
                task={value}
                key={value.id}
                handleMenuClick={handleMenuClick}
              />
            ))}
          </div>
        </div>
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
