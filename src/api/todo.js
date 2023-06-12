import { apiClient } from './client';

// 조회
export const getToDos = async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const response = await apiClient.get('/todos', config);
        // console.log(response);
        // console.log('현재 리스트', response.data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

// 추가
export const createToDo = async (toDoText) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const response = await apiClient.post('/todos', { todo: toDoText }, config);
        // console.log(response);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

// 수정
export const updateToDo = async (id, toDoText, isCompleted) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const response = await apiClient.put(
            `/todos/${id}`,
            { todo: toDoText, isCompleted: isCompleted },
            config
        );
        // console.log(response);
        return response;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

// 삭제
export const deleteToDo = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const response = await apiClient.delete(`/todos/${id}`, config);
        // console.log(response);
        return response;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
