import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface EventCategory {
    id: number,
    name: string,
    slug: string,
}

interface EventResponse {
    success: boolean,
    count: number,
    data: EventCategory[],
}

export const fetchEventCategories = createAsyncThunk(
    'eventCategories/fetchEventCategories',
    async (_, { getState }) => {
        const { eventCategories } = getState() as { eventCategories: { items: EventCategory[] } };

        // Если категории уже загружены, не делаем повторный запрос
        if (eventCategories.items.length > 0) {
            return eventCategories.items;
        }

        const response = await axios.get<EventResponse>('https://spb-afisha.gate.petersburg.ru/kg/external/afisha/categories', {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhU1RaZm42bHpTdURYcUttRkg1SzN5UDFhT0FxUkhTNm9OendMUExaTXhFIn0.eyJleHAiOjE4Mzk0MzU0OTEsImlhdCI6MTc0NDc0MTA5MSwianRpIjoiMjU4MDNmMGEtNWZmYi00NzFiLThlM2QtMzFlMjY1ZGJhMDQyIiwiaXNzIjoiaHR0cHM6Ly9rYy5wZXRlcnNidXJnLnJ1L3JlYWxtcy9lZ3MtYXBpIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjM5YzBmYzE4LTUyOWItNDYyMy05ODgzLTI1MDA4Njg4NDkyYyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLXJlc3QtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjFmYzBlY2NkLWEwNzUtNDNiYi04MzI3LTlkYmEyMDg4ZWFlYyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtZWdzLWFwaSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIxZmMwZWNjZC1hMDc1LTQzYmItODMyNy05ZGJhMjA4OGVhZWMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQmtC-0L3RgdGC0LDQvdGC0LjQvSDQmtC-0L3RgdGC0LDQvdGC0LjQvSIsInByZWZlcnJlZF91c2VybmFtZSI6IjgzYzYxMWQzYmIxMWFmNmI3ZjhhNWFmOGIzYTgyOGNlIiwiZ2l2ZW5fbmFtZSI6ItCa0L7QvdGB0YLQsNC90YLQuNC9IiwiZmFtaWx5X25hbWUiOiLQmtC-0L3RgdGC0LDQvdGC0LjQvSJ9.jIER5r_7BVW0UeS8SQx9TSYq82qidrvs5C9QQ5hBMqHNBt5P3oXEZ6aXnEXPkH6pVpaW3u3JLNDYX_7Qcjy9WtB5enRRX2N-UCK4B5WkJZW30g-bEbdWn0Rg9PUJ9tvCkDyULYVI4P0ZbHvAABrDkzOWiu6GLXmgtQabnKuhdZOy0If0x1WvgoUjofBaJTrINQM5Bxd1tqQ_3QXT3oR9TnLBlUUKHBfgHA83SJKfEe2irsSo_bZ-cXvUoWLzKQX1ORZ2YwGQavZ5DPeDiWhG0kMZHVcdlofvG5BsRVPAIf8i2eMdQhzZxqG5g7U6XaQg8976iflQUCEx0T5-RruwRA` // Добавляем токен в заголовок
            }
        });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error('Failed to load events');
    }
);