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
        return await axios.post(globalConstants.api + '/quiz-admin/add-quiz', data);
    },
    addCoverImage: async (data, id) => {
        return await axios.patch(globalConstants.api + '/quiz-admin/update-quiz/' + id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    },
    removeQuiz: async (id) => {
        return await axios.delete(globalConstants.api + '/quiz-admin/' + id);
    },
    updateQuiz: async (id, data) => {
        return await axios.patch(globalConstants.api + '/quiz-admin/update-quiz/' + id, data)
    },
    getQuizDetailById: async(id) => {
        return await axios.get(globalConstants.api + '/quiz/' + id)
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