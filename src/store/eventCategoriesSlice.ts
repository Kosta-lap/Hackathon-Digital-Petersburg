import { createSlice } from '@reduxjs/toolkit';
import { fetchEventCategories } from './eventCategoriesActions';

interface EventCategory {
    id: number,
    name: string,
    slug: string,
}

interface EventCategoriesState {
    items: EventCategory[];
    loading: boolean;
    error: string | null;
}

const initialState: EventCategoriesState = {
    items: [],
    loading: false,
    error: null,
};

const eventCategoriesSlice = createSlice({
    name: 'eventCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchEventCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при загрузке категорий событий';
            });
    },
});

export default eventCategoriesSlice.reducer;