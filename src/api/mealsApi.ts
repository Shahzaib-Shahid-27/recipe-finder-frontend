import httpClient from "./httpClient";
import type { AxiosResponse } from "axios";

import type { RawMeal } from "../types/meal";

export const mealsApi = {
  
  getAllMeals(): Promise<AxiosResponse<RawMeal[]>> {
    return httpClient.get("/meals");
  },

  getMealById(id: string | number): Promise<AxiosResponse<RawMeal>> {
    return httpClient.get(`/meals/${id}`);
  },
};
