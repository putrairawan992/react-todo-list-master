import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/partials/Header';
import EmptyActivityImage from '../assets/images/empty-activity.svg';
import {
  addAsyncActivity,
  ALERT_MODE,
  deleteAsyncActivity,
  DELETE_MODE,
  getAsyncActivity,
  IDLE_MODE,
  resetAlertAction,
  setDeleteModeActivityAction,
  setModeAction,
  todoState,
} from '../redux/todoSlice';

// const DashboardHeader = dynamic(() => import('../components/dashboard/DashboardHeader'));
// const ActivityList = dynamic(() => import('../components/dashboard/ActivityList'));
// const Header = dynamic(() => import('../components/partials/Header'));

import DashboardHeader from '../components/dashboard/DashboardHeader';
import ActivityList from '../components/dashboard/ActivityList';

const ModalToast = dynamic(() => import('../components/modals/ModalToast'));
const ModalDelete = dynamic(() => import('../components/modals/ModalDelete'));
const MainSpinner = dynamic(() => import('../components/partials/MainSpinner'));

export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    loadingGetActivities,
    dataGetActivities,
    selectedActivity,
    mode,
    alertMessage,
    alertType,
    loadingDeleteActivity,
    loadingAddActivity,
  } = useSelector(todoState);
  const getActivity = () => dispatch(getAsyncActivity());

  const setShowDeleteModal = (show) => dispatch(setModeAction(show ? DELETE_MODE : IDLE_MODE));
  const deleteActivity = (id) => dispatch(deleteAsyncActivity(id));
  const onClickDelete = (activity) => dispatch(setDeleteModeActivityAction(activity));

  const addActivity = () => dispatch(addAsyncActivity());

  const resetAlert = () => dispatch(resetAlertAction());

  useEffect(() => {
    getActivity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>To Do List - Dashboard</title>
      </Head>
      <Header />
      <main className="container dashboard">
        <DashboardHeader
          handleAdd={addActivity}
          loadingAdd={loadingAddActivity}
        />
        <div className="contents mb-3">
          {loadingGetActivities
          && (dataGetActivities?.data?.length < 1 || !dataGetActivities) && <MainSpinner />}
          {dataGetActivities?.data?.length < 1
            ? (
              <div className="empty-activity-container" data-cy="activity-empty-state" onClick={addActivity} aria-hidden>
                <Image src={EmptyActivityImage} alt="empty" layout="fill" />
              </div>
            ) : (
              <ActivityList
                activities={dataGetActivities?.data}
                handleDelete={onClickDelete}
              />
            )}
        </div>
      </main>
      <ModalToast
        text={alertMessage}
        type={alertType}
        handleClose={resetAlert}
        show={mode === ALERT_MODE}
      />
      <ModalDelete
        show={mode === DELETE_MODE}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={() => deleteActivity(selectedActivity.id)}
        loading={loadingDeleteActivity}
        renderBody={() => (
          <p>
            Apakah anda yakin menghapus activity
            {' '}
            <strong>
              “
              {selectedActivity?.title}
              ”
            </strong>
            ?
          </p>
        )}
      />
    </>
  );
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );

  return { props: {} };
}
