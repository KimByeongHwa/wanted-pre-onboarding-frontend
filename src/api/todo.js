import { apiClient } from './client';

// 조회
export const getTodos = async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const response = await apiClient.get('/todos', config);
        // console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// 추가
export const createTodo = async (content) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const response = await apiClient.post('/todos', { todo: content }, config);
    return response.data;
    // console.log(response);
};
