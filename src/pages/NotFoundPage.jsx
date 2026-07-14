import { useNavigate } from "react-router";
import { Layers, ArrowBigLeft } from "lucide-react";
import "./NotFoundPage.css";
import { Button } from "antd";

export default function NotFoundPage() {
  const router = useNavigate();
  return (
    <div id="not-found-page">
      <div className="header-not-found-page">
        <div className="icon-layer">
          <Layers size={20} color="#fff" />
        </div>
        <span className="text-login">To-Do List</span>
      </div>

      <div className="notfound-card">
        <div className="notfound-title">404</div>
        <div className="notfound-message">Page Not Found</div>
        <div className="notfound-desc">
          Oops! This page seems to have <br />
          wandered off into the mist.
        </div>
        <div className="wrapper-btn-backhome">
          <Button
            type="primary"
            className="btn-back-home"
            onClick={() => router("/")}
          >
            Go Back Home <ArrowBigLeft size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
