import "./CardDone.css";
import { Ellipsis } from "lucide-react";
import DropdownTask from "../components/DropdownTask";
import { Button } from "antd";

export default function CardTodo(props) {
  const { handleMenuClick } = props;
  return (
    <div className="card-done">
      <div className="wrapper-tag-done">
        <div className="tag-done">{props.task?.category}</div>
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
      <div className="title-done">{props.task?.title}</div>
      <p className="desc-done">{props.task?.description}</p>
    </div>
  );
}
