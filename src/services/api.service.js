import { globalConstants } from '@/global_constants';
import axios from 'axios';

const categoryQueries = {
    getAllCategories: async () => {
        return await axios.get(globalConstants.api + "/category/get-all-categories");
    }
};

const quizQueries = {
    getAllQuizzes: async () => {
        return await axios.get(globalConstants.api + '/quiz/find-all');
    },
    getAllQuizzesByUserId: async () => {
        return await axios.get(globalConstants.api + '/quiz/find-all-quizzes-of-user');
    },
    createQuiz: async (data) => {
        return await axios.post(globalConstants.api + '/quiz-admin/add-quiz', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }
};

const userQueries = {
    register: async (userData) => {
        return await axios.post(globalConstants.api + '/user/register', userData);
    },
    update: async (userData) => {
        return await axios.patch(globalConstants.api + '/user/update', userData);
    }
};

export const ApiService = {
    categoryQueries,
    quizQueries,
    userQueries
};