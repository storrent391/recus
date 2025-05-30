// src/app/manage-groups/manage-groups.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { GroupsService } from '../../../services/groups.service';
import { GroupModel } from '../../../models/groups/group.model';
import { getCurrentAcademicYear } from '../../../utils/date-utils';

@Component({
  selector: 'app-manage-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent implements OnInit {
  courseOptions = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
  groups: GroupModel[] = [];
  originalNames: Record<string, string> = {};
  currentYear = '';

  showForm = false;
  newGroupName = '';
  newCourse = '';

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.currentYear = getCurrentAcademicYear();
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupsService.getGroupsByYear(this.currentYear).subscribe({
      next: list => {
        this.groups = list;
        this.originalNames = {};
        list.forEach(g => this.originalNames[g.uuid] = g.name);
      },
      error: () => {
        Swal.fire('Error', 'Unable to load groups.', 'error');
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newGroupName = '';
      this.newCourse = '';
    }
  }

  submitNewGroup(): void {
    const name = this.newGroupName.trim();
    if (!name) {
      Swal.fire('Validation', 'Group name is required.', 'warning');
      return;
    }
    if (name.length > 30) {
      Swal.fire('Validation', 'Group name cannot exceed 30 characters.', 'warning');
      return;
    }
    if (!this.newCourse) {
      Swal.fire('Validation', 'Course selection is required.', 'warning');
      return;
    }

    this.groupsService.createGroup(name, this.newCourse).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Group Created',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        });
        this.loadGroups();
        this.toggleForm();
      },
      error: err => {
        Swal.fire('Error', err.error?.message || 'Could not create group.', 'error');
      }
    });
  }

  saveName(group: GroupModel): void {
    if (group.name === this.originalNames[group.uuid]) {
      return;
    }
    this.groupsService.updateGroupName(group.uuid, group.name).subscribe({
      next: updated => {
        this.originalNames[updated.uuid] = updated.name;
        Swal.fire({
          icon: 'success',
          title: 'Name Updated',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: err => {
        Swal.fire('Error', err.error?.message || 'Could not update name.', 'error');
        group.name = this.originalNames[group.uuid];
      }
    });
  }

  confirmDelete(group: GroupModel): void {
    Swal.fire({
      title: `Delete group "${group.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.groupsService.deleteGroup(group.uuid).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              toast: true,
              position: 'top-end',
              timer: 2000,
              showConfirmButton: false
            });
            this.loadGroups();
          },
          error: err => {
            Swal.fire('Error', err.error?.message || 'Could not delete group.', 'error');
          }
        });
      }
    });
  }
}
