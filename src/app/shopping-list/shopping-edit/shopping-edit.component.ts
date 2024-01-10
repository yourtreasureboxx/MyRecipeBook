import { Component, type OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { type NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editmode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor (private readonly shoppinglistService: ShoppingListService) {}
  ngOnInit (): void {
    this.subscription = this.shoppinglistService.startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editmode = true;
        this.editedItem = this.shoppinglistService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  onSubmitItem (form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editmode) {
      this.shoppinglistService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.shoppinglistService.addIngredient(newIngredient);
    }
    this.editmode = false;
    form.reset();
  }

  onClear (): void {
    this.slForm.reset();
    this.editmode = false;
  }

  onDeleteItem (): void {
    this.shoppinglistService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
}
