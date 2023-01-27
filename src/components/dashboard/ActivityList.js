import Link from 'next/link';
import { BsTrash } from 'react-icons/bs';
import humanDateFormat from '../../utils/humanDateFormat';

export default function ActivityList({ activities, handleDelete }) {
  return (
    <div className="row g-3">
      {activities?.map((activity, key) => (
        <div key={activity?.id} data-cy={`activity-item-${key}`} className="col-12 col-md-8 col-lg-6">
          <div className="card-activity" data-cy="activity-item">
            <Link
              href={`/detail/${activity.id}`}
            >
              <div
                className="card-body-activity"
              >
                <h3 data-cy="activity-item-title">{activity?.title}</h3>
              </div>
            </Link>
            <div className="card-footer-activity">
              <span data-cy="activity-item-date" className="activity-date">
                {humanDateFormat(activity?.created_at)}
              </span>
              <span aria-hidden className="p-2" data-cy="activity-item-delete-button" onClick={() => handleDelete(activity)}>
                <BsTrash size={18} className="icon-delete" />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
