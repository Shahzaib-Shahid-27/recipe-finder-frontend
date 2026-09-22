import type { Meal } from "../types/meal";
const API_URL =  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

interface MealsResponse {
  success: boolean;
  data: Meal[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const mealsService = {

  async getAllMeals(): Promise<Meal[]> {

    const url = `${API_URL}/meals?page=1&limit=10`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();

      console.error("API ERROR:", errorText);

      throw new Error("Failed to fetch meals");
    }

    const result: MealsResponse = await response.json();

    return result.data;
  },
};