import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { CategoryList } from './features/categories/category-list/category-list';
import { SizeList } from './features/sizes/size-list/size-list';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: 'categories', component: CategoryList },
      { path: 'sizes', component: SizeList },
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
    ],
  },
];