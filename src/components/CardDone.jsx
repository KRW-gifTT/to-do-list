import "./CardDone.css";
import { Ellipsis } from "lucide-react";

export default function CardTodo(props) {
  return (
    <div className="card-done">
      <div className="wrapper-tag-done">
        <div className="tag-done">adada </div>
        <Ellipsis size={18} color="#CBD5E1" />
      </div>
      <div className="title-done">sssadadada</div>
      <p className="desc-done">daaaaaadadasddddddddddddddddddddddddddd</p>
    </div>
  );
}
