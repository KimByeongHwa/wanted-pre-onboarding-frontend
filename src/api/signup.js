import { apiClient } from './client';

export const signUpApi = async (email, password) => {
    try {
        const response = await apiClient.post('auth/signup', {
            email,
            password,
        });

        if (response.status === 201) {
            // console.log('회원가입 성공');
            return response;
        } else {
            throw new Error('회원가입 실패', response.status);
        }
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
