import Modal from 'react-bootstrap/Modal';
import { FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';

export default function ModalToast({
  show, handleClose, text, type,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="modal-toast"
      data-cy="modal-information"
      size="md"
      centered
      animation={false}
    >
      <Modal.Body onClick={handleClose}>
        {type && (type === 'success'
          ? <FiAlertCircle data-cy="modal-information-icon" size={24} className="text-success" />
          : <FiAlertTriangle data-cy="modal-information-icon" size={24} className="text-danger" />)}
        <p data-cy="modal-information-title">{text}</p>
      </Modal.Body>
    </Modal>
  );
}
