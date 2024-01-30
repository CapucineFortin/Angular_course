import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Observable } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class HttpService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    fetchData(){
        this.http
            .get<Recipe[]>('https://angular-formation-f2834-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
            .subscribe(response => {
                this.recipeService.updateRecipes(response);
                console.log(response);
            })

    }
    
    saveData(): Observable<any>{
        return this.http
            .put(
                'https://angular-formation-f2834-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', 
                this.recipeService.recipes
            );
    }
}

