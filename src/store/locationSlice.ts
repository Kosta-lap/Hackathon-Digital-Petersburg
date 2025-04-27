import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
    latitude: number;
    longitude: number;
}

const initialState: LocationState = {
    latitude: 0,
    longitude: 0
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setUserLocation: (state, action: PayloadAction<LocationState>) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        }
    }
});

export const { setUserLocation } = locationSlice.actions;
export default locationSlice.reducer;