/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyItemImage from '../../assets/images/empty-item.svg';
import {
  ACTIVITY_EDIT_MODE,
  addAsyncItem,
  ADD_MODE,
  ALERT_MODE,
  deleteAsyncItem,
  DELETE_MODE,
  getAsyncActivityDetail,
  IDLE_MODE,
  resetAlertAction,
  setDeleteModeItemAction,
  setModeAction,
  setSortModeAction,
  setUpdateModeItemAction,
  todoState,
  updateAsyncActivity,
  updateAsyncItem,
  UPDATE_MODE,
} from '../../redux/todoSlice';
// const Header = dynamic(() => import('../../components/partials/Header'));
// const MainSpinner = dynamic(() => import('../../components/partials/MainSpinner'));
// const ItemList = dynamic(() => import('../../components/activity-detail/ItemList'));

import ActivityDetailHeader from '../../components/activity-detail/ActivityDetailHeader';
import Header from '../../components/partials/Header';
import MainSpinner from '../../components/partials/MainSpinner';
import ItemList from '../../components/activity-detail/ItemList';

// const ActivityDetailHeader =
// dynamic(() => import('../../components/activity-detail/ActivityDetailHeader'));
const ModalDelete = dynamic(() => import('../../components/modals/ModalDelete'));
const ModalFormItem = dynamic(() => import('../../components/modals/ModalFormItem'));
const ModalToast = dynamic(() => import('../../components/modals/ModalToast'));

export default function Detail() {
  const { query: { id: paramId } } = useRouter();

  const {
    loadingGetActivityDetail,
    dataGetActivityDetail,
    loadingAddItem,
    loadingDeleteItem,
    loadingUpdateItem,
    selectedItem,
    mode,
    alertMessage,
    alertType,
    sortItemMode,
  } = useSelector(todoState);

  const dispatch = useDispatch();

  const getActivityDetail = (id) => dispatch(getAsyncActivityDetail(id));
  const addItem = (activityId, item) => dispatch(addAsyncItem({ activityId, ...item }));
  const updateItem = (item) => dispatch(updateAsyncItem(item));
  const setMode = (_mode) => dispatch(setModeAction(_mode));
  const setShowDeleteModal = (show) => dispatch(setModeAction(show ? DELETE_MODE : IDLE_MODE));
  const deleteItem = (id) => dispatch(deleteAsyncItem(id));
  const onClickDelete = (item) => dispatch(setDeleteModeItemAction(item));
  const onClickUpdate = (item) => dispatch(setUpdateModeItemAction(item));
  const resetAlert = () => dispatch(resetAlertAction());

  useEffect(() => {
    dispatch(setModeAction(IDLE_MODE));
  }, []);

  useEffect(() => {
    if (paramId) {
      getActivityDetail(paramId);
    }
  }, [paramId]);

  const handleSubmit = ({ title, priority }) => {
    if (mode === ADD_MODE) {
      addItem(paramId, { title, priority });
    }

    if (mode === UPDATE_MODE) {
      updateItem({
        ...selectedItem,
        title,
        priority,
      });
    }
  };

  const toggleActiveItem = (item) => {
    updateItem({
      ...item,
      isActive: item.is_active === 1 ? 0 : 1,
    });
  };

  const setSortItemMode = (_mode) => dispatch(setSortModeAction(_mode));

  const updateActivity = ({ title }) => dispatch(
    updateAsyncActivity({ id: paramId, title }),
  );

  return (
    <>
      <Head>
        <title>To Do List - Detail</title>
      </Head>
      <Header withBack />
      <main className="container activity-detail">
        <ActivityDetailHeader
          title={dataGetActivityDetail?.data?.title}
          loadingAdd={loadingAddItem}
          handleAdd={() => setMode(ADD_MODE)}
          sortItemMode={sortItemMode}
          setSortItemMode={setSortItemMode}
          activityEditMode={mode === ACTIVITY_EDIT_MODE}
          updateActivity={updateActivity}
          setActivityEditMode={() => setMode(ACTIVITY_EDIT_MODE)}
        />

        <div className="contents mb-3">
          {loadingGetActivityDetail && !dataGetActivityDetail?.data
          && <MainSpinner />}

          {dataGetActivityDetail?.data?.todo_items?.length < 1
            ? (
              <div className="empty-activity-container" data-cy="todo-empty-state" onClick={() => mode === IDLE_MODE && setMode(ADD_MODE)} aria-hidden>
                <Image src={EmptyItemImage} alt="empty" layout="fill" onClick={() => mode === IDLE_MODE && setMode(ADD_MODE)} />
              </div>
            )
            : (
              <ItemList
                todoItems={dataGetActivityDetail?.data?.todo_items}
                toggleActiveItem={toggleActiveItem}
                onClickUpdate={onClickUpdate}
                onClickDelete={onClickDelete}
              />
            )}
        </div>
        <ModalFormItem
          show={mode === ADD_MODE || mode === UPDATE_MODE}
          handleClose={() => { setMode(IDLE_MODE); }}
          selectedItem={mode === UPDATE_MODE ? selectedItem : null}
          handleSubmit={handleSubmit}
          mode={mode}
          loading={loadingAddItem || loadingUpdateItem}
        />
        <ModalToast
          text={alertMessage}
          type={alertType}
          handleClose={resetAlert}
          show={mode === ALERT_MODE}
        />
        <ModalDelete
          show={mode === DELETE_MODE}
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={() => deleteItem(selectedItem.id)}
          loading={loadingDeleteItem}
          renderBody={() => (
            <p>
              Apakah anda yakin menghapus List item
              {' '}
              <strong>
                “
                {selectedItem?.title}
                ”
              </strong>
              ?
            </p>
          )}
        />
      </main>
    </>
  );
}
