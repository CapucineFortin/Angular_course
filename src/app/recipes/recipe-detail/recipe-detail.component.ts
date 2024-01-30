import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  selectedRecipe;

  constructor(
    private shoppingListService: ShoppingListService, 
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (param) => { this.selectedRecipe = this.recipeService.getRecipeByName(param['name']) }
    )
  }

  addToCart(){
    for (let ingredient of this.selectedRecipe.ingredients){
      this.shoppingListService.addIngredient(ingredient)
    }
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeService.getIndex(this.selectedRecipe.name));
    this.router.navigate(["/recipes"]);
  }
}
