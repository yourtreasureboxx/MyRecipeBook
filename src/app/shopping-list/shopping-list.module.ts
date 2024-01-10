import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Route, RouterModule } from '@angular/router';

const appRoutes: Route[] = [
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [RouterModule.forChild(appRoutes), ],
  exports: []
})
export class ShoppingListModule {
}
