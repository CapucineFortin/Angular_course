import { Component, Input } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  constructor (private recipeService: RecipeService) {}
  
  @Input() recipe;
}
