import "./CardProgress.css";
import { Ellipsis } from "lucide-react";
import DropdownTask from "../components/DropdownTask";
import { Button } from "antd";

export default function CardTodo(props) {
  const { handleMenuClick } = props;
  return (
    <div className="card-progress">
      <div className="wrapper-tag-progress">
        <div className="tag-progress">{props.task?.category}</div>
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
      <div className="title-progress">{props.task?.title}</div>
      <p className="desc-progress">{props.task?.description}</p>
    </div>
  );
}
