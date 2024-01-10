import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor (private readonly http: HttpClient, private readonly recipes: RecipeService, private authService: AuthService) {}

  storeRecipes () {
    const recipes = this.recipes.getRecipes();
    return this.http.put('https://myrecipebook-64b28-default-rtdb.firebaseio.com/recipes.json',
      recipes
    );
  }

  fetchRecipes () {
    return this.http.get<Recipe[]>('https://myrecipebook-64b28-default-rtdb.firebaseio.com/recipes.json'
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }), tap(response => {
        this.recipes.setRecipes(response);
      })
    );
  }
}
