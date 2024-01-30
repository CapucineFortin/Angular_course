import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
    recipes: Recipe[] = [
        new Recipe(
          "Tiramisu",
          "Best desert", 
          "https://www.guydemarle.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOTNLQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--96535ad7a5c27062439e6ac6e843992d54bbdfcd/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9VWTI5dFltbHVaVjl2Y0hScGIyNXpld2c2QzNKbGMybDZaVWtpRFRZd01IZzJNREJlQmpvR1JWUTZER2R5WVhacGRIbEpJZ3REWlc1MFpYSUdPd2RVT2dsamNtOXdTU0lRTmpBd2VEWXdNQ3N3S3pBR093ZFUiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--929a1958a8630156464b089800ca739f1b4570de/blob",
          [ new Ingredient("Chocolate", 4),
            new Ingredient("Mascarpone", 12)]),
        new Recipe(
          "Fraisier", 
          "Best dessert ex-aequo", 
          "https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/e74f3a8f-e4bc-44b6-bde7-089a498b2942_WO6rhDa.jpg",
          [ new Ingredient("Crème", 4),
            new Ingredient("Starberry", 12)]),
      ];

    recipeSelected = new EventEmitter<Recipe>();

    getRecipeByName(name: String) : Recipe{
      return this.recipes.filter((recipe: Recipe) => recipe.name == name)[0];
    }

    getIndex(name: string): number {
      return this.recipes.findIndex(recipe => recipe.name == name);
    }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
    }

    updateRecipe(index: number, recipe: Recipe){
      this.recipes[index] = recipe;
    }

    updateRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
    }

    deleteRecipe(index: number){  
      this.recipes.splice(index, 1);
    }
}