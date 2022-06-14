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
        return await axios.patch(globalConstants.api + '/quiz-admin/update-quiz/' + id, data);
    },
    getQuizDetailById: async (id) => {
        return await axios.get(globalConstants.api + '/quiz/' + id);
    },
    addQuestion: async (quizId, data) => {
        return await axios.post(globalConstants.api + '/quiz-admin/add-question/' + quizId, data);
    },
    findQuestion: async (quizId, questionId) => {
        return await axios.get(globalConstants.api + '/quiz-admin/find-question/' + quizId + '/' + questionId);
    },
    updateQuestion: async (quizId, questionId, data) => {
        return await axios.patch(globalConstants.api + '/quiz-admin/update-question/' + quizId + '/' + questionId, data);
    },
    getAllQuizzesByCategorySlug: async (slug) => {
        return await axios.get(globalConstants.api + '/quiz/get-quizzes-by-category-slug/' + slug);
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

const gameQueries = {
    createGame: async (quizId, data) => {
        return await axios.post(globalConstants.api + '/game/create-game/' + quizId, data);
    },
    findGameWithKey: async (gameKey) => {
        return await axios.get(globalConstants.api + '/game/find-game-with-key/' + gameKey);
    },
    joinGame: async (quizId, gameId) => {
        return await axios.post(globalConstants.api + '/game/join-game/' + quizId + '/' + gameId);
    },
    getQuestions: async (quizId) => {
        return await axios.get(globalConstants.api + '/game/get-questions/' + quizId);
    },
    getAllGamesByUser: async () => {
        return await axios.get(globalConstants.api + '/game/get-all-games-by-user');
    },
    getGameDetailsById: async (gameId) => {
        return await axios.get(globalConstants.api + '/game/get-game-details-by-id/' + gameId)
    }
};

const resultQueries = {
    submitAnswer: async (resultId, data) => {
        return await axios.post(globalConstants.api + '/quiz-result/add-answer-result/' + resultId, data);
    },
    getAllResultsByUser: async () => {
        return await axios.get(globalConstants.api + '/quiz-result/find-all-results-by-user-id');
    },
    getQuizResultByIdBelongsUser: async (resultId) => {
        return await axios.get(globalConstants.api + '/quiz-result/get-quiz-result-by-id-belongs-user/' + resultId)
    },
    getQuizResultByGameAndUserId: async (gameId, userId) => {
        return await axios.get(globalConstants.api + '/quiz-result/get-quiz-result-by-game-and-user-id/' + gameId + '/' + userId)
    }
};

export const ApiService = {
    categoryQueries,
    quizQueries,
    userQueries,
    gameQueries,
    resultQueries
};