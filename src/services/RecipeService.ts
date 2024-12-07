import axios from "axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse } from "../utils/recipes-schema";
import { SearchFilter } from "../types";

export async function getCategories() {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
        const { data } = await axios(url);
    
        const result = CategoriesAPIResponseSchema.safeParse(data);
    
        if(result.success) return result.data;
        
    } catch (error) {
        console.log(error)
    }
}

export async function searchRecipies(searchFilter: SearchFilter) {
    try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFilter.ingredient}&c=${searchFilter.category}`;
        const { data } = await axios(url);
        const result = DrinksAPIResponse.safeParse(data);

        if(result) return result.data
        
    } catch (error) {
        console.log(error)
    }
}
