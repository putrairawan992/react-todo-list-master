import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { BsCheck2 } from 'react-icons/bs';
import Select from 'react-select';
import { ADD_MODE, UPDATE_MODE } from '../../redux/todoSlice';

function DropdownIndicator() {
  return <div data-cy="modal-add-priority-dropdown" className="icon-dropdown w-100 h-100 p-4" />;
}

export default function ModalFormItem({
  show,
  handleClose,
  selectedItem,
  handleSubmit,
  mode,
  loading,
}) {
  const [itemTitle, setItemTitle] = useState(mode === UPDATE_MODE ? selectedItem.title : '');
  const [priority, setPriority] = useState(mode === UPDATE_MODE ? selectedItem.priority : 'very-high');

  const options = [
    {
      value: 'very-high',
      label: 'Very High',
    },
    {
      value: 'high',
      label: 'High',
    },
    {
      value: 'normal',
      label: 'Medium',
    },
    {
      value: 'low',
      label: 'Low',
    },
    {
      value: 'very-low',
      label: 'Very Low',
    },
  ];

  const optionLabel = ({ value, label, priority: selectedPriority }) => (
    <div
      data-cy="modal-add-priority-item"
      className="d-flex align-items-center justify-content-between"
    >
      <div className="d-flex align-items-center m-0">
        <div className={`priority-label ${value}`} />
        <div>{label}</div>
      </div>
      {
        value === selectedPriority && (<BsCheck2 size={24} className="icon-check" />)
      }
    </div>
  );

  useEffect(() => {
    const isUpdateMode = () => mode === UPDATE_MODE;
    setItemTitle(isUpdateMode() ? selectedItem.title : '');
    setPriority(isUpdateMode() ? selectedItem.priority : 'very-high');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const onSubmit = () => {
    handleSubmit({
      title: itemTitle,
      priority,
    });
  };

  return (
    <div data-cy="modal-add">
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-form-item d-flex justify-content-center"
        size="md"
        centered
        animation={false}
      >
        <Modal.Header>
          <Modal.Title className="pt-4">
            <h4
              className="font-weight-bold"
              data-cy="modal-add-title"
            >
              {mode === ADD_MODE ? 'Tambah' : 'Edit'}
              {' '}
              List Item
            </h4>
            <div
              className="icon-close"
              onClick={handleClose}
              data-cy="modal-add-close-button"
              aria-hidden
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <label htmlFor="AddFormTitle" data-cy="modal-add-name-title">NAMA LIST ITEM</label>
            <div data-cy="modal-add-name-input">
              <Form.Control
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="Tambahkan nama Activity"
                id="AddFormTitle"
                defaultValue={mode === UPDATE_MODE ? selectedItem.title : ''}
              />
            </div>
            <label data-cy="modal-add-priority-title">PRIORITY</label>
            <br />
            <Select
              defaultValue={mode === UPDATE_MODE
                ? options.find((item) => item.value === selectedItem.priority) : options[0]}
              formatOptionLabel={(option) => optionLabel({ ...option, priority })}
              options={options}
              className="select-priority"
              onChange={(e) => setPriority(e.value)}
              id="AddFormPriority"
              components={{ DropdownIndicator }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="pb-4">
          <button
            className="btn btn-primary"
            onClick={onSubmit}
            disabled={itemTitle === ''}
            id="AddFormSubmit"
            data-cy="modal-add-save-button"
            type="button"
          >
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
              />
            )}
            {!loading && (
              mode === ADD_MODE ? 'Tambah' : 'Edit'
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
