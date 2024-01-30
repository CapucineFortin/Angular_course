import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { NoRecipeComponent } from "./recipes/no-recipe/no-recipe.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard] ,children: [
        { path: '', component: NoRecipeComponent },
        { path: 'new', component: RecipeEditComponent, pathMatch: 'full' },
        { path: ':name', component: RecipeDetailComponent },
        { path: ':name/edit', component: RecipeEditComponent },
    ]},
    { path: "shopping-list", component: ShoppingListComponent, canActivate: [AuthGuard] },
    { path: "auth", component: AuthComponent}
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}