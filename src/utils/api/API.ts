import {auth,meals} from "./apiEndpoints"

import api from "./axiosInstance";


// Auth API
export const registerUser = (name: string, email: string, password: string) =>
    api.post(auth.register, { name, email, password }).then((res) => res.data);

export const loginUser = (email: string, password: string) =>
    api.post(auth.login, { email, password }).then((res) => res.data);

export const getProfile = () =>
    api.get(auth.getProfile).then((res) => res.data);

export const logoutUser = () =>
    api.post(auth.logout).then((res) => res.data);

export const forgotPassword = (email: string) =>
    api.post(auth.forgotPassword, { email }).then((res) => res.data);

export const resetPassword = (email: string, currentPassword: string, newPassword: string) =>
    api
        .post(auth.resetPassword, { email, currentPassword, newPassword })
        .then((res) => res.data);



        // Meals API
export const getAllMeals = (page = 1, limit = 10) =>
    api.get(meals.allMeals, { params: { page, limit } }).then((res) => res.data);

export const getMealById = (id: number) =>
    api.get(`${meals.mealId}/${id}`).then((res) => res.data);

export const searchMeals = (query:string , page = 1, limit = 10) =>
    api.get(`${meals.search}/${query}`, { params: { q: query, page, limit } }).then((res) => res.data);

export const getCategories = (page = 1, limit = 10) =>
    api.get(meals.categories, { params: { page, limit } }).then((res) => res.data);

export const getMealsByCategory = (category:string, page = 1, limit = 10) =>
    api.get(`${meals.category}/${category}`, { params: { page, limit } }).then((res) => res.data);