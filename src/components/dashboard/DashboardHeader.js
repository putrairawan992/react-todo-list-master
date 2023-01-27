import { BsPlusLg } from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';

export default function DashboardHeader({ loadingAdd, handleAdd }) {
  return (
    <div className="dashboard-header">
      <h2 data-cy="activity-title">Activity</h2>
      <button
        onClick={handleAdd}
        data-cy="activity-add-button"
        type="button"
        className="btn btn-primary d-flex align-items-center justify-content-center"
      >
        {loadingAdd ? (
          <Spinner
            as="span"
            animation="border"
            size="md"
            role="status"
          />
        ) : (
          <>
            <BsPlusLg size={18} className="prepend-icon" strokeWidth={0.01} />
            Tambah
          </>
        )}
      </button>
    </div>
  );
}
