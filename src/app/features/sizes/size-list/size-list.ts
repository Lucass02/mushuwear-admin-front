import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SizeService, Size } from '../../../core/services/size';

@Component({
  selector: 'app-size-list',
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
  templateUrl: './size-list.html',
  styleUrl: './size-list.css',
})
export class SizeList implements OnInit {
  sizes = signal<Size[]>([]);
  isLoading = signal(true);
  isSaving = signal(false);
  editingId = signal<number | null>(null);
  displayedColumns: string[] = ['id', 'name', 'order', 'actions'];

  sizeForm!: ReturnType<FormBuilder['group']>;
  
  constructor(
    private readonly sizeService: SizeService,
    private readonly fb: FormBuilder,
  ) {

    this.sizeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }
 
  ngOnInit(): void {
    this.loadSizes();
  }

  loadSizes(): void {
    this.isLoading.set(true);
    this.sizeService.getAll().subscribe({
      next: (data) => {
        this.sizes.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar talles', err);
        this.isLoading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.sizeForm.invalid) {
      return;
    }

    this.isSaving.set(true);
    const name = this.sizeForm.value.name!;
    const currentEditingId = this.editingId();

    const request$ = currentEditingId
      ? this.sizeService.update(currentEditingId, { name })
      : this.sizeService.create({ name });

    request$.subscribe({
      next: () => {
        this.cancelEdit();
        this.isSaving.set(false);
        this.loadSizes();
      },
      error: (err) => {
        console.error('Error al guardar talle', err);
        this.isSaving.set(false);
      },
    });
  }

  startEdit(size: Size): void {
    this.editingId.set(size.id);
    this.sizeForm.setValue({ name: size.name });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.sizeForm.reset();
  }

  deleteSize(size: Size): void {
    const confirmed = confirm(
      `¿Seguro que querés eliminar el talle "${size.name}"?`,
    );
    if (!confirmed) {
      return;
    }

    this.sizeService.delete(size.id).subscribe({
      next: () => this.loadSizes(),
      error: (err) => console.error('Error al eliminar talle', err),
    });
  }
}