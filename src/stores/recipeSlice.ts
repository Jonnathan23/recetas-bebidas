import { StateCreator } from "zustand"
import { getCategories, searchRecipies } from "../services/RecipeService"
import { Categories, Drink, Drinks, SearchFilter } from "../types"


export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    fetchCategories: () => Promise<void>
    searchRecipies: (searchFilter: SearchFilter) => Promise<void>
    selectRecipie: (id: Drink['idDrink']) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },

    drinks: {
        drinks: []
    },

    fetchCategories: async () => {
        const categories = await getCategories()

        set({ categories })

    },

    searchRecipies: async (searchFilter) => {
        const drinks = await searchRecipies(searchFilter)

        set({ drinks })
    },

    selectRecipie: async (id) => {
        console.log(id)
    }

})