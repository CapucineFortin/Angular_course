import { Component, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  editMode = false;
  index: number;
  selectedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit() {
    this.shoppingListService.selectedIngredient.subscribe(
      (index: number) => { 
        this.index = index;
        this.editMode = true;
        this.selectedIngredient = this.shoppingListService.ingredients[index];
        this.form.setValue({'name': this.selectedIngredient.name, 'amount': this.selectedIngredient.amount});
      }
    )
  }

  add() {
    const ingredient = new Ingredient(this.form.value.name, this.form.value.amount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(ingredient)
    } else {
      this.shoppingListService.editIngredient(this.index, ingredient)
    }
    this.reset();
  }

  delete() {
    this.shoppingListService.delete(this.index);
    this.reset();
  }

  reset() {
    this.form.reset();
    this.editMode = false;
  }
}
