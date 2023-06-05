import { apiClient } from './client';

export const signInApi = async (email, password) => {
    try {
        const response = await apiClient.post('auth/signin', {
            email,
            password,
        });

        if (response.status === 200) {
            // console.log('로그인 성공');
            return response;
        } else {
            throw new Error('로그인 실패', response.status);
        }
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
