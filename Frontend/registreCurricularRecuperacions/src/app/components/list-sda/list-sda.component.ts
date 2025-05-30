
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SdaService, PaginatedResponse } from '../../../services/sda.service';
import { SdaModel } from '../../../models/sda/sda.model';

@Component({
  selector: 'app-list-sda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-sda.component.html',
  styleUrls: ['./list-sda.component.css']
})
export class ListSdaComponent implements OnInit {
  sdaItems: SdaModel[] = [];
  errorMessage = '';

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  sortField: 'title' | 'createdAt' | 'groupName' = 'title';
  sortDirection: 'ASC' | 'DESC' = 'ASC';

  constructor(
    private sdaService: SdaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchSdas();
  }

  fetchSdas(): void {
    this.sdaService
      .getSdas(this.currentPage, this.pageSize, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: PaginatedResponse<SdaModel>) => {
          this.sdaItems = resp.data;
          this.currentPage = resp.page;
          this.pageSize = resp.limit;
          this.sortField = resp.sortBy as any;
          this.sortDirection = resp.sortOrder;
          this.totalPages = resp.totalPages;
          this.errorMessage = '';
        },
        error: err => {
          this.errorMessage = 'Error loading activities: ' + (err.error?.message || err.message);
        }
      });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/show-sda', id]);
  }

  changePage(delta: number): void {
    const next = this.currentPage + delta;
    if (next >= 1 && next <= this.totalPages) {
      this.currentPage = next;
      this.fetchSdas();
    }
  }

  updatePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.fetchSdas();
  }

  toggleSort(field: 'title' | 'createdAt' | 'groupName'): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortField = field;
      this.sortDirection = 'ASC';
    }
    this.currentPage = 1;
    this.fetchSdas();
  }
}
