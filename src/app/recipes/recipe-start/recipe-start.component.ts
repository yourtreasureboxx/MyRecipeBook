import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrl: './recipe-start.component.css'
})
export class RecipeStartComponent implements DoCheck {
  isRecipesEmpty: boolean;
  constructor (private recipesService: RecipeService) {}
  ngDoCheck (): void {
    this.isRecipesEmpty = (this.recipesService.getRecipes().length === 0) ? true : false;
  }
}
