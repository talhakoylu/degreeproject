import { globalConstants } from '@/global_constants';
import axios from 'axios';

const categoryQueries = {
    getAllCategories: async() => {
        return await axios.get(globalConstants.api + "/category/get-all-categories")
    }
}

const quizQueries = {
    getAllQuizzes: async() => {
        return await axios.get(globalConstants.api + '/quiz/find-all')
    }
}

export const ApiService = {
    categoryQueries,
    quizQueries
}