import "./CardProgress.css";
import { Ellipsis } from "lucide-react";

export default function CardTodo(props) {
  return (
    <div className="card-progress">
      <div className="wrapper-tag-progress">
        <div className="tag-progress">adada </div>
        <Ellipsis size={18} color="#CBD5E1" />
      </div>
      <div className="title-progress">sssadadada</div>
      <p className="desc-progress">daaaaaadadasddddddddddddddddddddddddddd</p>
    </div>
  );
}
