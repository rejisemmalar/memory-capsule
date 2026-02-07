import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import "../styles/createcapsule.css";

function CreateCapsule() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [image, setImage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!title || !message || !openDate) {
      setModalMessage(
        "Please fill in the required fields before locking your capsule.",
      );
      setShowModal(true);
      return;
    }

    const newCapsule = {
      id: Date.now(),
      title,
      message,
      mood,
      image,
      openDate,
      createdAt: new Date().toISOString(),
      reflection: "",
    };

    const existingCapsules = JSON.parse(localStorage.getItem("capsules")) || [];

    localStorage.setItem(
      "capsules",
      JSON.stringify([...existingCapsules, newCapsule]),
    );

    setModalMessage("Your memory capsule has been locked in time 🕰️");
    setShowModal(true);

    setTimeout(() => {
      navigate("/capsules");
    }, 1200);
  };

  return (
    <div className="create-page">
      <button className="circle-back" onClick={() => navigate("/")}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="form-glass create-card">
          {/* Header */}
          <div className="form-header mb-4 text-center">
            <h2 className="display-6">Create a Memory Capsule</h2>
            <p className="form-subtitle">
              Write something meaningful for the person you’ll become.
            </p>
          </div>

          <Form>
            <div className="form-body">
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="My First Job Journey"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  className="message-box"
                  placeholder="Today I feel excited and scared..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mood</Form.Label>
                <Form.Select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                >
                  <option value="">Select mood</option>
                  <option value="happy">😄 Happy</option>
                  <option value="calm">😌 Calm</option>
                  <option value="sad">😢 Sad</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Add Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Form.Group>

              {image && (
                <img src={image} alt="Preview" className="image-preview my-3" />
              )}

              <Form.Group className="mb-4">
                <Form.Label>Open Date</Form.Label>
                <Form.Control
                  type="date"
                  value={openDate}
                  onChange={(e) => setOpenDate(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="d-flex justify-content-end gap-3">
              <Button variant="outline-secondary" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Lock Capsule
              </Button>
            </div>
          </Form>
        </div>
      </Container>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Body className="text-center py-4">
          <i className="bi bi-lock-fill fs-1 text-primary mb-3"></i>
          <p className="text-secondary">{modalMessage}</p>

          <Button
            variant="primary"
            className="mt-3"
            onClick={() => setShowModal(false)}
          >
            OK
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateCapsule;
