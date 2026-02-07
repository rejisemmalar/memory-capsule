import { useNavigate } from "react-router-dom";
import "../styles/main.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-canvas flex items-center justify-center px-6">
      <div className="focus-card max-w-3xl w-full grid md:grid-cols-2 gap-10">
        {/* left */}
        <div className="flex flex-col justify-center">
          <h1 className="hero-title">
            Write to your{" "}
            <span className="block text-indigo-500">future self</span>
          </h1>

          <div className="hero-subtitle">
            <p className="line capture">
              Capture a moment <i className="bi bi-camera-fill"></i>
            </p>

            <p className="line lock">
              Lock it in time <i className="bi bi-lock-fill"></i>
            </p>

            <p className="line open">
              Open it when life moves forward{" "}
              <i className="bi bi-unlock-fill"></i>
            </p>
          </div>

          <div className="action-buttons">
            <button
              className="btn-3d primary"
              onClick={() => navigate("/create")}
            >
              <i className="bi bi-plus-lg me-2"></i>
              Create Capsule
            </button>

            <button
              className="btn-3d secondary"
              onClick={() => navigate("/capsules")}
            >
              <i class="bi bi-eye me-2"></i>
              View Capsules
            </button>
          </div>
        </div>

        {/* Right */}

        <div className="hidden md:flex right-panel">
          <div className="capsule-box">
            <i className="bi bi-box2-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
