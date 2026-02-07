import { useEffect, useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import CapsuleCard from "../components/CapsuleCard";
import "../styles/capsules.css";
import { useNavigate } from "react-router-dom";

export default function CapsulesTimeline() {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setCapsules(JSON.parse(localStorage.getItem("capsules")) || []);
  }, []);

  //   Date
  const [date, setDate] = useState(new Date());
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (now.toDateString() !== date.toDateString()) {
        setFlip(true);
        setTimeout(() => {
          setDate(now);
          setFlip(false);
        }, 600);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const isUnlocked = (date) => new Date() >= new Date(date);

  const isToday = (date) => {
    const d = new Date(date);
    const t = new Date();
    return d.toDateString() === t.toDateString();
  };

  //  time
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds() * 6;
  const minutes = time.getMinutes() * 6 + seconds / 60;
  const hours = (time.getHours() % 12) * 30 + minutes / 12;

  return (
    
    <div className="main">
      <button className="circle-back" onClick={() => navigate("/create")} style={{top:"0px"}}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <Container>
        <div className="timeline-header mb-4">
          <h2
            className="fs-3 d-flex align-items-center gap-3 mb-3"
            style={{ color: "white" }}
          >
            <div className="analog-clock-wrapper">
              <div className="analog-clock">
                <div
                  className="hand hour"
                  style={{ transform: `rotate(${hours}deg)` }}
                />
                <div
                  className="hand minute"
                  style={{ transform: `rotate(${minutes}deg)` }}
                />
                <div
                  className="hand second"
                  style={{ transform: `rotate(${seconds}deg)` }}
                />
                <div className="clock-center" />
              </div>{" "}
            </div>
            Your Capsules
            {/* Date */}
            <div className={`flip-calendar  ${flip ? "flip" : ""}`}>
              <div className="month">
                {date.toLocaleString("default", { month: "short" })}
              </div>
              <div className="day">{date.getDate()}</div>
              <div className="year">{date.getFullYear()}</div>
            </div>
          </h2>

          <div className="timeline-line"></div>
        </div>

        <div className="row g-4">
          {capsules.map((c) => {
            const unlocked = isUnlocked(c.openDate);
            const today = isToday(c.openDate);

            return (
              <div className="col-sm-6 col-lg-4" key={c.id}>
                <CapsuleCard
                  capsule={c}
                  unlocked={unlocked}
                  today={today}
                  onClick={() => setSelected(c)}
                />
              </div>
            );
          })}
        </div>
      </Container>

      <Modal show={!!selected} onHide={() => setSelected(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selected?.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selected && isUnlocked(selected.openDate) ? (
            <>
              <p>{selected.message}</p>
              {selected.image && (
                <img
                  src={selected.image}
                  alt=""
                  className="img-fluid rounded mt-3"
                />
              )}
            </>
          ) : (
            <p className="text-muted">
              This capsule opens on {selected?.openDate}
            </p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
