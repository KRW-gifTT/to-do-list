import "./CardTodo.css";
import { Ellipsis } from "lucide-react";
import { Button } from "antd";
import DropdownTask from "../components/DropdownTask";

export default function CardTodo(props) {
  const { handleMenuClick } = props;
  return (
    <div className="card-todo">
      <div className="wrapper-tag-todo">
        <div className="tag-todo">{props.task?.category}</div>

        <DropdownTask onMenuClick={(e) => handleMenuClick(e.key, props.task)}>
          <Button
            className="btn-ellipsis-todo"
            type="link"
            onClick={(e) => e.preventDefault()}
          >
            <Ellipsis size={18} color="#CBD5E1" />
          </Button>
        </DropdownTask>
      </div>

      <div className="title-todo">{props.task?.title}</div>
      <p className="desc-todo">{props.task?.description}</p>
    </div>
  );
}
