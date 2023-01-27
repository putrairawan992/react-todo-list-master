import api from './apiService';

export async function getActivityList() {
  const res = await api.get('/activity-groups', {
    params: {
      email: 'firman.mardiyanto@gmail.com',
    },
  });
  return res;
}

export async function getActivityDetail(id) {
  const res = await api.get(`/activity-groups/${id}`);
  return res;
}

export async function addActivity() {
  const res = await api.post('/activity-groups/', { email: 'firman.mardiyanto@gmail.com', title: 'New Activity' });
  return res;
}

export async function updateActivity({ id, title }) {
  const res = await api.patch(`/activity-groups/${id}`, {
    title,
  });
  return res;
}

export async function deleteActivity(id) {
  const res = await api.delete(`/activity-groups/${id}`, {});
  return res;
}

export async function addItem({ activityId, title, priority }) {
  const res = await api.post('/todo-items', {
    title,
    activity_group_id: activityId,
    priority,
  });
  return res;
}

export async function updateItem({
  id, isActive, title, priority,
}) {
  const res = await api.patch(`/todo-items/${id}`, { is_active: isActive, title, priority });
  return res;
}

export async function deleteItem(id) {
  const res = await api.delete(`/todo-items/${id}`, {});
  return res;
}
