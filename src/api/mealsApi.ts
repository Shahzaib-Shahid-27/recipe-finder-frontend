

import httpClient from "./httpClient";
import type { RawMeal } from "../types/meal";

export const mealsApi = {

  getAllMeals: () =>
    httpClient.get<RawMeal[]>("/meals"),

  getMealById: (id: string | number) =>
    httpClient.get<RawMeal>(`/meals/${id}`),
  
};