import { Component, EventEmitter,Output } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private http: HttpService, private recipeService: RecipeService) {}

  onFetch() {
    this.http.fetchData();
  }

  onSave() {
    this.http.saveData().subscribe();
  }
}
