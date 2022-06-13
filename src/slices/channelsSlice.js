import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = {
  ids: [],
  entities: {},
  defaultChannel: null,
  activeChannel: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setAll,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setDefaultChannel: (state, { payload }) => ({ ...state, defaultChannel: payload }),
    setActiveChannel: (state, { payload }) => ({ ...state, activeChannel: payload }),
  },
});

export const { actions } = channelsSlice;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
