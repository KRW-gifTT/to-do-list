import "./Dashboard.css";
import CardTodo from "../components/CardTodo";
import CardProgress from "../components/CardProgress";
import CardDone from "../components/CardDone";
import { Plus, Bell, CirclePlus } from "lucide-react";
import ProfileAppbar from "../components/ProfileAppbar";

export default function Dashboard() {
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
            <button className="btn-newtask">
              <Plus size={18} />
              New Task
            </button>
          </div>
          <ProfileAppbar />
        </div>
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

          <button className="btn-newtask-bottom">
            <CirclePlus size={20} fill="#D1B9FA" color="#fff" />
            Add New Task
          </button>
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
