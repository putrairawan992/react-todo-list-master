import { BsPlusLg, BsCheck2 } from 'react-icons/bs';
import { FaChevronLeft } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/router';
import { HiOutlinePencil } from 'react-icons/hi';
import {
  Children, forwardRef, useEffect, useRef, useState,
} from 'react';
import sortingItems from '../../utils/sortingItems';

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <div
    aria-hidden
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

const CustomMenu = forwardRef(
  ({
    children, style, className, 'aria-labelledby': labeledBy,
  }, ref) => {
    const [value] = useState('');
    return (
      <div
        ref={ref}
        style={style}
        className={`${className}`}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {Children.toArray(children).filter(
            (child) => !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

export default function ActivityDetailHeader({
  title = 'New Activity',
  loadingAdd,
  handleAdd,
  sortItemMode,
  setSortItemMode,
  activityEditMode,
  updateActivity,
  setActivityEditMode,
}) {
  const { push } = useRouter();
  const backToHome = () => push('/');

  const activityTitleInput = useRef(null);
  const [activityTitle, setActivityTitle] = useState(title);

  useEffect(() => {
    setActivityTitle(title);
  }, [title]);

  const handleOnBlur = () => {
    updateActivity(
      { title: activityTitle },
    );
  };

  const handleEditActivityTitle = () => {
    setActivityEditMode();
    setTimeout(() => {
      activityTitleInput.current?.focus();
    }, 10);
  };

  return (
    <div className="activity-detail-header gap-4">
      <div className="d-flex gap-4">
        <FaChevronLeft data-cy="todo-back-button" size={32} className="icon-back my-auto d-none d-md-block" onClick={backToHome} />
        {
          activityEditMode ? (
            <input
              type="text"
              ref={activityTitleInput}
              onBlur={handleOnBlur}
              onChange={(e) => setActivityTitle(e.target.value)}
              value={activityTitle}
            />
          )
            : (
              <h2
                data-cy="todo-title"
                aria-hidden
                onClick={handleEditActivityTitle}
                className="my-auto"
              >
                {title}
              </h2>
            )
}
        <HiOutlinePencil data-cy="todo-title-edit-button" size={24} className="icon-edit my-auto" onClick={handleEditActivityTitle} />
      </div>

      <div className="d-flex action justify-content-end">
        <Dropdown>
          <Dropdown.Toggle
            as={CustomToggle}
            id="dropdown-custom-components"
          >
            <button
              type="button"
              id="ButtonSort"
              className="btn-sort"
              data-cy="todo-sort-button"
            >
              {sortingItems.find((item) => item.id === sortItemMode).icon}
            </button>
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu} data-cy="sort-parent">
            {sortingItems.map((sort) => (
              <Dropdown.Item eventKey={sort.id} key={sort.id} data-cy="sort-selection">
                <div
                  aria-hidden
                  className={`d-flex justify-content-between item-label ${
                    sortItemMode === sort.id && 'active'
                  }`}
                  onClick={() => setSortItemMode(sort.id)}
                  data-cy={
                    sortItemMode === sort.id && 'sort-selection-selected'
                  }
                >
                  <div>
                    {sort.icon}
                    <span data-cy="sort-selection-title">{sort.name}</span>
                  </div>
                  <div>
                    {
                  sortItemMode === sort.id && (
                  <BsCheck2
                    size={24}
                    className="icon-check"
                  />
                  )
                }
                  </div>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <button
          onClick={handleAdd}
          data-cy="todo-add-button"
          type="button"
          className="btn btn-primary d-flex align-items-center justify-content-center"
        >
          {loadingAdd ? (
            <Spinner
              as="span"
              animation="border"
              size="md"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <>
              <BsPlusLg size={18} className="prepend-icon" strokeWidth={0.01} />
              Tambah
            </>
          )}
        </button>
      </div>
    </div>
  );
}
