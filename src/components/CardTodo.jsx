import "./CardTodo.css";
import { Ellipsis } from "lucide-react";
import { Button } from "antd";
import DropdownTask from "../components/DropdownTask";

export default function CardTodo(props) {
  return (
    <div className="card-todo">
      <div className="wrapper-tag-todo">
        <div className="tag-todo">adada </div>

        <DropdownTask onMenuClick={(e) => console.log("clicked", e.key)}>
          <Button
            className="btn-ellipsis-todo"
            type="link"
            onClick={(e) => e.preventDefault()}
          >
            <Ellipsis size={18} color="#CBD5E1" />
          </Button>
        </DropdownTask>
      </div>

      <div className="title-todo">sssadadada</div>
      <p className="desc-todo">daaaaaadadasddddddddddddddddddddddddddd</p>
    </div>
  );
}
