import Form from 'react-bootstrap/Form';
import { BsTrash } from 'react-icons/bs';
import { HiOutlinePencil } from 'react-icons/hi';

export default function ItemList({
  todoItems, toggleActiveItem, onClickUpdate, onClickDelete,
}) {
  return todoItems?.map((item) => (
    <div key={item.id} className="content-item" data-cy="todo-item">
      <div className="d-flex align-items-center form-check">
        <Form.Check
          checked={item?.is_active === 1}
          type="checkbox"
          id={`default-${item.id}`}
          data-cy="todo-item-checkbox"
          onChange={() => toggleActiveItem(item)}
        />
        <div
          data-cy="todo-item-priority-indicator"
          className={`priority-label ${item.priority}`}
        />
        <span
          className={`${item?.is_active === 1 && 'todo-done'}`}
          data-cy="todo-item-title"
        >
          {item.title}
        </span>
        <HiOutlinePencil
          size={18}
          data-cy="todo-item-edit-button"
          className="icon-edit"
          onClick={() => onClickUpdate(item)}
        />
        <div
          aria-hidden
          className="icon-edit-p"
          onClick={() => {}}
        />
      </div>
      <BsTrash size={18} data-cy="todo-item-delete-button" className="icon-delete my-auto" onClick={() => onClickDelete(item)} />
    </div>
  ));
}
