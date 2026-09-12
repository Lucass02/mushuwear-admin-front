import { Routes } from '@angular/router';
import { CategoryList } from './features/categories/category-list/category-list';

export const routes: Routes = [
  { path: 'categories', component: CategoryList },
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
];