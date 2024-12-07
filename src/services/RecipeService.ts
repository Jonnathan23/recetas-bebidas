import axios from "axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types";

export async function getCategories() {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
        const { data } = await axios(url);

        const result = CategoriesAPIResponseSchema.safeParse(data);

        if (result.success) return result.data;

    } catch (error) {
        console.log(error)
    }
}

export async function searchRecipies(searchFilter: SearchFilter) {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFilter.ingredient}&c=${searchFilter.category}`;
        const { data } = await axios(url);
        const result = DrinksAPIResponse.safeParse(data);

        if (result) return result.data

    } catch (error) {
        console.log(error)
    }
}


export async function getRecipeById(id: Drink['idDrink']) {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        const { data } = await axios(url)
        const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])

        if (result.success) return result.data

    } catch (error) {
        console.log(error)
    }
}