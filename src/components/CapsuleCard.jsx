import { Card } from "react-bootstrap";
import "../styles/capsules.css";

function CapsuleCard({ capsule, unlocked, onClick }) {
  return (
    <div className="capsule-perspective">
      <div className={`gift-wrapper ${unlocked ? "open" : "closed"}`}>
        <div className="wrap-front" />
        <div className="wrap-top" />
      </div>

      <Card
        className={`capsule-card-modern ${unlocked ? "unlock-glow" : ""}`}
        style={{ borderRadius: "50px 0px 50px 0px", cursor: "pointer" }}
        onClick={onClick}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="capsule-title mb-0">{capsule.title}</h5>

            {unlocked ? (
              <i className="bi bi-unlock fs-4 text-success"></i>
            ) : (
              <i className="bi bi-lock fs-4 text-secondary"></i>
            )}
          </div>

          <p className="capsule-date mb-2">
            Opens on: <span>{capsule.openDate}</span>
          </p>

          {capsule.mood && (
            <span className="capsule-mood mt-2 d-inline-block">
              Mood: <strong>{capsule.mood}</strong>
            </span>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CapsuleCard;
