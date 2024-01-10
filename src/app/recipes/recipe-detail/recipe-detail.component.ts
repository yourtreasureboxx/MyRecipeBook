import { Component, OnInit } from '@angular/core';
import { type Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor (private readonly recipeService: RecipeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {}

  ngOnInit (): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientToSPList(this.recipe.ingredients);
  }

  onEditRecipe (): void {
    this.router.navigate(['edit'], { relativeTo: this.route});
    // this.router.navigate(['../',this.id,'edit'], { relativeTo: this.route});
  }

  onDeleteRecipe (): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
}
