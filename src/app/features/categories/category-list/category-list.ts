import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService, Category } from '../../../core/services/category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {
  categories = signal<Category[]>([]);
  isLoading = signal(true);
  isSaving = signal(false);
  editingId = signal<number | null>(null);
  displayedColumns: string[] = ['id', 'name', 'actions'];

  categoryForm!: ReturnType<FormBuilder['group']>;
  
  constructor(
    private readonly categoryService: CategoryService,
    private readonly fb: FormBuilder,
  ) {

    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }
 
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading.set(true);
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

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    this.isSaving.set(true);
    const name = this.categoryForm.value.name!;
    const currentEditingId = this.editingId();

    const request$ = currentEditingId
      ? this.categoryService.update(currentEditingId, { name })
      : this.categoryService.create({ name });

    request$.subscribe({
      next: () => {
        this.cancelEdit();
        this.isSaving.set(false);
        this.loadCategories();
      },
      error: (err) => {
        console.error('Error al guardar categoría', err);
        this.isSaving.set(false);
      },
    });
  }

  startEdit(category: Category): void {
    this.editingId.set(category.id);
    this.categoryForm.setValue({ name: category.name });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.categoryForm.reset();
  }

  deleteCategory(category: Category): void {
    const confirmed = confirm(
      `¿Seguro que querés eliminar la categoría "${category.name}"?`,
    );
    if (!confirmed) {
      return;
    }

    this.categoryService.delete(category.id).subscribe({
      next: () => this.loadCategories(),
      error: (err) => console.error('Error al eliminar categoría', err),
    });
  }
}