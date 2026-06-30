import "./Dashboard.css";
import CardTodo from "../components/CardTodo";
import CardProgress from "../components/CardProgress";
import CardDone from "../components/CardDone";
import { Plus, Bell, CirclePlus } from "lucide-react";
import ProfileAppbar from "../components/ProfileAppbar";
import Newtasks from "../components/NewTasks";
import { Button } from "antd";
import React from "react";

export default function Dashboard() {
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
    <div id="dashboard">
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

      <div className="kanbanboard">
        <div className="lane">
          <div className="wrapper-lane-header">
            <div className="lane-header">
              <div className="circle-todo"></div>TO DO
            </div>
            <span className="count">3</span>
          </div>

          <div className="lane-content">
            <CardTodo />
          </div>
          <div className="lane-content">
            <CardTodo />
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
            <span className="count">1</span>
          </div>
          <div className="lane-content">
            <CardProgress />
          </div>
        </div>

        <div className="lane">
          <div className="wrapper-lane-header">
            <div className="lane-header">
              <div className="circle-done"></div>DONE
            </div>
            <span className="count">2</span>
          </div>
          <div className="lane-content">
            <CardDone />
          </div>
        </div>
      </div>
    </div>
  );
}
