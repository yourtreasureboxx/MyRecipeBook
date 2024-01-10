import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { type Recipe } from './recipe.model';
import { DataStorageService } from '../shared/dataStorage.service';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor (private readonly dataStorageService: DataStorageService, private recipesService: RecipeService ) {}
  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
