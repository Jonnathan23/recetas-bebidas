import { StateCreator } from "zustand"
import { getCategories, getRecipeById, searchRecipies } from "../services/RecipeService"
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"


export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: Boolean
    fetchCategories: () => Promise<void>
    searchRecipies: (searchFilter: SearchFilter) => Promise<void>
    selectRecipie: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,

    fetchCategories: async () => {
        const categories = await getCategories()

        set({ categories })

    },

    searchRecipies: async (searchFilter) => {
        const drinks = await searchRecipies(searchFilter)

        set({ drinks })
    },

    selectRecipie: async (id) => {
        const selectedRecipe = await getRecipeById(id)

        set({ selectedRecipe, modal: true })
    },

    closeModal: () => {
        set({ modal: false, selectedRecipe: {} as Recipe })
    }

})