/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addActivity,
  addItem,
  deleteActivity,
  deleteItem,
  getActivityDetail,
  getActivityList,
  updateActivity,
  updateItem,
} from '../services/todo';

export const DELETE_MODE = 'DELETE_MODE';
export const UPDATE_MODE = 'UPDATE_MODE';
export const ADD_MODE = 'ADD_MODE';
export const ACTIVITY_EDIT_MODE = 'ACTIVITY_EDIT_MODE';
export const IDLE_MODE = 'IDLE_MODE';
export const ALERT_MODE = 'ALERT_MODE';
export const ALERT_SUCCESS = 'success';
export const ALERT_ERROR = 'danger';
export const ALERT_MESSAGE = 'message';
export const SORT_ASC = 'asc';
export const SORT_DESC = 'desc';
export const SORT_ACTIVE = 'active';
export const SORT_NEWEST = 'newest';
export const SORT_OLDEST = 'oldest';

const sortItem = (items, sortBy) => {
  switch (sortBy) {
    case SORT_NEWEST:
      return items.sort((a, b) => b.id - a.id);
    case SORT_OLDEST:
      return items.sort((a, b) => a.id - b.id);
    case SORT_ASC:
      return items.sort((a, b) => a.title.localeCompare(b.title));
    case SORT_DESC:
      return items.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return items.sort((a, b) => b.is_active - a.is_active);
  }
};

const initialState = {
  loadingGetActivities: false,
  dataGetActivities: false,

  loadingGetActivityDetail: false,
  dataGetActivityDetail: false,

  loadingGetItems: false,
  dataGetItems: false,

  loadingAddActivity: false,
  dataAddActivity: false,

  loadingUpdateActivity: false,
  dataUpdateActivity: false,

  loadingDeleteActivity: false,
  dataDeleteActivity: false,

  loadingAddItem: false,
  dataAddItem: false,

  loadingUpdateItem: false,
  dataUpdateItem: false,

  loadingDeleteItem: false,
  dataDeleteItem: false,

  selectedActivity: null,
  selectedItem: null,
  mode: IDLE_MODE,
  alertMessage: null,
  alertType: null,

  sortItemMode: SORT_ACTIVE,
};

export const getAsyncActivity = createAsyncThunk(
  'todo/getAsyncActivity',
  async () => {
    const { data } = await getActivityList();
    return data;
  },
);

export const getAsyncActivityDetail = createAsyncThunk(
  'todo/getAsyncActivityDetail',
  async (id) => {
    const { data } = await getActivityDetail(id);
    return { data };
  },
);

export const addAsyncActivity = createAsyncThunk(
  'todo/addAsyncActivity',
  async (payload, { dispatch }) => {
    const { data } = await addActivity();
    dispatch(getAsyncActivity());
    return data;
  },
);

export const updateAsyncActivity = createAsyncThunk(
  'todo/updateAsyncActivity',
  async (payload, { dispatch, getState }) => {
    const { data } = await updateActivity(payload);
    const { todo: { dataGetActivityDetail: { data: { id: activityId } } } } = getState();
    dispatch(getAsyncActivityDetail(activityId));
    return data;
  },
);

export const deleteAsyncActivity = createAsyncThunk(
  'todo/deleteAsyncActivity',
  async (id, { dispatch }) => {
    const { data } = await deleteActivity(id);
    dispatch(getAsyncActivity());
    return data;
  },
);

export const addAsyncItem = createAsyncThunk(
  'todo/addAsyncItem',
  async (payload, { dispatch, getState }) => {
    const { data } = await addItem(payload);
    const { todo: { dataGetActivityDetail: { data: { id: activityId } } } } = getState();
    dispatch(getAsyncActivityDetail(activityId));
    return data;
  },
);

export const updateAsyncItem = createAsyncThunk(
  'todo/updateAsyncItem',
  async (payload, { dispatch, getState }) => {
    const { data } = await updateItem(payload);
    const { todo: { dataGetActivityDetail: { data: { id: activityId } } } } = getState();
    dispatch(getAsyncActivityDetail(activityId));
    return data;
  },
);

export const deleteAsyncItem = createAsyncThunk(
  'todo/deleteAsyncItem',
  async (id, { dispatch, getState }) => {
    const { data } = await deleteItem(id);
    const { todo: { dataGetActivityDetail: { data: { id: activityId } } } } = getState();
    dispatch(getAsyncActivityDetail(activityId));
    return data;
  },
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setSelectedActivity: (state, action) => {
      state.selectedActivity = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    resetAlert: (state) => {
      state.mode = IDLE_MODE;
      state.alertMessage = null;
      state.alertType = null;
    },
    setSortMode: (state, action) => {
      state.sortItemMode = action.payload;
      if (state.dataGetActivityDetail) {
        state.dataGetActivityDetail.data
          .todo_items = sortItem(state.dataGetActivityDetail.data.todo_items, state.sortItemMode);
      }
    },
    setDeleteModeActivity: (state, action) => {
      state.mode = DELETE_MODE;
      state.selectedActivity = action.payload;
    },
    setDeleteModeItem: (state, action) => {
      state.mode = DELETE_MODE;
      state.selectedItem = action.payload;
    },
    setUpdateModeItem: (state, action) => {
      state.mode = UPDATE_MODE;
      state.selectedItem = action.payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getAsyncActivity.pending, (state) => {
      state.loadingGetActivities = true;
    });
    addCase(getAsyncActivity.fulfilled, (state, action) => {
      state.loadingGetActivities = false;
      state.dataGetActivities = action.payload;
    });
    addCase(getAsyncActivity.rejected, (state, action) => {
      state.loadingGetActivities = false;
      state.mode = ALERT_MODE;
      state.alertType = ALERT_ERROR;
      state.alertMessage = action.error.message;
    });

    addCase(getAsyncActivityDetail.pending, (state) => {
      state.loadingGetActivityDetail = true;
    });
    addCase(getAsyncActivityDetail.fulfilled, (state, action) => {
      state.loadingGetActivityDetail = false;
      state.dataGetActivityDetail = {
        ...action.payload,
        data: {
          ...action.payload.data,
          todo_items: sortItem(action.payload.data.todo_items, state.sortItemMode),
        },
      };
    });
    addCase(getAsyncActivityDetail.rejected, (state) => {
      state.loadingGetActivityDetail = false;
    });

    addCase(addAsyncActivity.pending, (state) => {
      state.loadingAddActivity = true;
    });
    addCase(addAsyncActivity.fulfilled, (state) => {
      state.loadingAddActivity = false;
    });
    addCase(addAsyncActivity.rejected, (state, action) => {
      state.loadingAddActivity = false;
      state.mode = ALERT_MODE;
      state.alertType = ALERT_ERROR;
      state.alertMessage = action.error.message;
    });

    addCase(updateAsyncActivity.pending, (state) => {
      state.loadingUpdateActivity = true;
    });
    addCase(updateAsyncActivity.fulfilled, (state) => {
      state.loadingUpdateActivity = false;
      state.mode = IDLE_MODE;
    });
    addCase(updateAsyncActivity.rejected, (state, action) => {
      state.loadingUpdateActivity = false;
      state.mode = ALERT_MODE;
      state.alertType = ALERT_ERROR;
      state.alertMessage = action.error.message;
    });

    addCase(deleteAsyncActivity.pending, (state) => {
      state.loadingDeleteActivity = true;
    });
    addCase(deleteAsyncActivity.fulfilled, (state) => {
      state.loadingDeleteActivity = false;
      state.mode = ALERT_MODE;
      state.alertMessage = 'Activity berhasil dihapus';
      state.alertType = ALERT_SUCCESS;
      state.selectedActivity = null;
    });
    addCase(deleteAsyncActivity.rejected, (state, action) => {
      state.loadingDeleteActivity = false;
      state.mode = ALERT_MODE;
      state.alertType = ALERT_ERROR;
      state.alertMessage = action.error.message;
    });

    addCase(addAsyncItem.pending, (state) => {
      state.loadingAddItem = true;
    });
    addCase(addAsyncItem.fulfilled, (state) => {
      state.loadingAddItem = false;
      state.mode = IDLE_MODE;
    });
    addCase(addAsyncItem.rejected, (state, action) => {
      state.loadingAddItem = false;
      state.mode = ALERT_MODE;
      state.alertMessage = action.error.message;
      state.alertType = ALERT_ERROR;
    });

    addCase(updateAsyncItem.pending, (state) => {
      state.loadingUpdateItem = true;
    });
    addCase(updateAsyncItem.fulfilled, (state) => {
      state.loadingUpdateItem = false;
      state.mode = IDLE_MODE;
    });
    addCase(updateAsyncItem.rejected, (state, action) => {
      state.loadingUpdateItem = false;
      state.mode = ALERT_MODE;
      state.alertMessage = action.error.message;
      state.alertType = ALERT_ERROR;
    });

    addCase(deleteAsyncItem.pending, (state) => {
      state.loadingDeleteItem = true;
    });
    addCase(deleteAsyncItem.fulfilled, (state) => {
      state.loadingDeleteItem = false;
      state.mode = ALERT_MODE;
      state.alertMessage = 'Item berhasil dihapus';
      state.alertType = ALERT_SUCCESS;
    });
    addCase(deleteAsyncItem.rejected, (state, action) => {
      state.loadingDeleteItem = false;
      state.mode = ALERT_MODE;
      state.alertMessage = action.error.message;
      state.alertType = ALERT_ERROR;
    });
  },
});

export const todoState = (state) => state.todo;
export const {
  setMode: setModeAction,
  setSelectedActivity: setSelectedActivityAction,
  setSelectedItem: setSelectedItemAction,
  resetAlert: resetAlertAction,
  setSortMode: setSortModeAction,
  setDeleteModeActivity: setDeleteModeActivityAction,
  setDeleteModeItem: setDeleteModeItemAction,
  setUpdateModeItem: setUpdateModeItemAction,
} = todoSlice.actions;

export default todoSlice.reducer;
