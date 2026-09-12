import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryService, Category } from '../../../core/services/category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {
  categories = signal<Category[]>([]);
  isLoading = signal(true);
  displayedColumns: string[] = ['id', 'name'];

  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
        this.isLoading.set(false);
      },
    });
  }
}