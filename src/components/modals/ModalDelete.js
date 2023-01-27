import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { FiAlertTriangle } from 'react-icons/fi';

export default function ModalDelete({
  show,
  title,
  renderBody = () => <p>Are you sure want to delete this item?</p>,
  handleClose,
  handleDelete,
  loading = false,
}) {
  return (
    <div data-cy="modal-delete">
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-delete"
        size="md"
        centered
        animation={false}
      >
        <Modal.Header>
          <Modal.Title className="pt-4">
            <FiAlertTriangle data-cy="modal-delete-icon" size={84} className="icon-delete" strokeWidth={1} />
            <h4 className="font-weight-bold" data-cy="modal-delete-title">{title}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p data-cy="modal-delete-title">
            {renderBody()}
          </p>
        </Modal.Body>
        <Modal.Footer className="pb-4">
          <button
            type="button"
            className="btn btn-secondary"
            data-cy="modal-delete-cancel-button"
            onClick={handleClose}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger d-flex align-items-center justify-content-center"
            data-cy="modal-delete-confirm-button"
            onClick={handleDelete}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Hapus'
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
