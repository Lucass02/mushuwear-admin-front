import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

interface NavGroup {
  label: string;
  icon: string;
  items: NavItem[];
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  navGroups: NavGroup[] = [
    {
      label: 'Catálogo',
      icon: 'inventory_2',
      items: [
        { path: 'categories', label: 'Categorías', icon: 'category' },
        { path: 'sizes', label: 'Talles', icon: 'straighten' },
        { path: 'colors', label: 'Colores', icon: 'palette' },
        { path: 'products', label: 'Productos', icon: 'checkroom' },
        { path: 'variants', label: 'Variantes', icon: 'style' },
      ],
    },
    {
      label: 'Stock',
      icon: 'warehouse',
      items: [
        { path: 'stock-movements', label: 'Movimientos', icon: 'swap_vert' },
      ],
    },
  ];
}