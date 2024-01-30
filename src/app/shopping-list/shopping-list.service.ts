import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredients : Ingredient[] = [
        new Ingredient("Chocolate", 4),
        new Ingredient("Starberry", 12)
      ];

    selectedIngredient = new Subject<number>();

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    editIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
    }

    delete(index: number) {
        this.ingredients.splice(index, 1);
    }
}