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
    }
};

const userQueries = {
    register: async (userData) => {
        return await axios.post(globalConstants.api + '/user/register', userData);
    },
    update: async (userData) => {
        return await axios.patch(globalConstants.api + '/user/update', userData );
    }
};

export const ApiService = {
    categoryQueries,
    quizQueries,
    userQueries
};