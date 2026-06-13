import "./CardTodo.css";
import { Ellipsis } from "lucide-react";

export default function CardTodo(props) {
  return (
    <div className="card-todo">
      <div className="wrapper-tag-todo">
        <div className="tag-todo">adada </div>
        <Ellipsis size={18} color="#CBD5E1" />
      </div>

      <div className="title-todo">sssadadada</div>
      <p className="desc-todo">daaaaaadadasddddddddddddddddddddddddddd</p>
    </div>
  );
}
