import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router'
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { FormArray, FormControl, FormGroup, NgControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  name;
  isNew: boolean;
  form: FormGroup;
  selectedRecipe: Recipe;
  index: number;

  constructor(private router: Router,  private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (param) => { 
        this.name = param['name'];
        this.index = this.recipeService.getIndex(this.name);
        this.isNew = this.name == null;
      }
    )

    this.selectedRecipe = this.isNew ? null : this.recipeService.getRecipeByName(this.name);
    let ingredientsArray = new FormArray([]);
    if (!this.isNew) {
    for (let ingredient of this.selectedRecipe.ingredients) {
        ingredientsArray.push(
          new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount),        
          })
        )
      };
    }

    this.form = new FormGroup(
      {
        'name': new FormControl(this.isNew ? null : this.selectedRecipe.name),
        'description': new FormControl(this.isNew ? null : this.selectedRecipe.description),
        'imagePath': new FormControl(this.isNew ? null : this.selectedRecipe.imagePath),
        'ingredients': ingredientsArray
      }
    ) 
  }

  get controls() {
    return (this.form.get('ingredients') as FormArray).controls;
}
  addIngredient(){
    (this.form.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl(null),
      'amount': new FormControl(null),        
    }));
  }

  deleteIngredient(index: number){
    this.recipeService.recipes[this.index].ingredients.slice(index,1);
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  submit() {
    const recipe = new Recipe(
      this.form.value['name'], 
      this.form.value['description'], 
      this.form.value['imagePath'], 
      this.form.value['ingredients']
      );
    if (this.isNew) {
      this.recipeService.addRecipe(recipe);
    } else {
      //Attention !!! les champs et le model doivent être exactement les mêmes (nom de variable)
      this.recipeService.updateRecipe(this.index, this.form.value);
    }
    this.cancel();
  }

  cancel() {
    if (this.isNew) {
      this.router.navigate(["/recipes"]);
    } else {
      this.router.navigate(["/recipes", this.form.value['name']]);
    }
  }
}
