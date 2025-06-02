
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { UserCenterRelationService } from '../../../services/user-center-relation.service';
import { UserModel } from '../../../models/users/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-teachers.component.html',
  styleUrls: ['./manage-teachers.component.css']
})
export class ManageTeachersComponent implements OnInit {
  teachers: UserModel[] = [];
  originalRoles: Record<string, number> = {};

  showForm = false;
  newEmail = '';
  newRole: number | null = null;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private relationService: UserCenterRelationService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.usersService.getUsersByCenter().subscribe({
      next: list => {
        this.teachers = list;
        this.originalRoles = {};
        list.forEach(u => (this.originalRoles[u.email] = u.role));
      },
      error: err => {
        console.error('Error loading teachers:', err);
        Swal.fire('Error', 'Unable to load teachers.', 'error');
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newEmail = '';
      this.newRole = null;
    }
  }

  submitNewTeacher(): void {
    const email = this.newEmail.trim();
    const role = this.newRole;
    if (!email || email.length > 50 || role == null) {
      Swal.fire('Validation', 'Valid email and role are required.', 'warning');
      return;
    }

    this.relationService.addUserToCenter(email, role).subscribe({
      next: () => {
        this.loadTeachers();
        this.toggleForm();
      },
      error: err => {
        Swal.fire('Error', err.error?.message || 'Could not add teacher.', 'error');
      }
    });
  }

  saveRole(user: UserModel): void {
    if (user.role === this.originalRoles[user.email]) {
      return;
    }
    this.relationService.updateRole(user.email, user.role).subscribe({
      next: () => {
        this.originalRoles[user.email] = user.role;
        Swal.fire({
          icon: 'success',
          title: 'Role Updated',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: err => {
        Swal.fire('Error', err.error?.message || 'Could not update role.', 'error');
        user.role = this.originalRoles[user.email];
      }
    });
  }

  confirmDelete(user: UserModel): void {
    Swal.fire({
      title: `Remove "${user.name || user.email}" from center?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.relationService.deleteRelation(user.email).subscribe({
          next: () => {
            this.loadTeachers();
            Swal.fire({
              icon: 'success',
              title: 'Removed',
              toast: true,
              position: 'top-end',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: err => {
            Swal.fire('Error', err.error?.message || 'Could not remove teacher.', 'error');
          }
        });
      }
    });
  }

  manageGroups(user: UserModel): void {
    this.router.navigate(['/manage-user-groups', user.uuid]);
  }
}
