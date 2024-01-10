import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  constructor (private readonly shoppinglistService: ShoppingListService) {}
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tea',
  //     'This is Irani Tea',
  //     'https://cdn.pixabay.com/photo/2013/07/13/09/51/drink-156144_1280.png',
  //     [new Ingredient('Milk', 2), new Ingredient('Tea powder', 1.5), new Ingredient('Sugar', 4)]),
  //   new Recipe(
  //     'Maggi',
  //     '@ 2 Minutes Ready',
  //     'https://cdn.pixabay.com/photo/2014/12/22/00/05/spaghetti-576784_1280.png',
  //     [new Ingredient('Maggi', 1), new Ingredient('Water', 1)])
  // ];

  private recipes: Recipe[] = [];
  recipeChanged = new Subject<Recipe[]>();

  setRecipes (recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes (): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe (id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientToSPList (ingredients: Ingredient[]): void {
    this.shoppinglistService.addIngrdients(ingredients);
  }

  addRecipe (recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe (index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe (index: number): void {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
