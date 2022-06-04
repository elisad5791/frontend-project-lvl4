import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setAll,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
  },
});

export const {
  addChannel, setChannels, removeChannel, renameChannel,
} = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
