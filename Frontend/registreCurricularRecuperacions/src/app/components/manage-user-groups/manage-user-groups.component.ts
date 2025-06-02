
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserGroupRelationService } from '../../../services/user-group-relation.service';
import { GroupsService } from '../../../services/groups.service';
import { GroupModel } from '../../../models/groups/group.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { getCurrentAcademicYear } from '../../../utils/date-utils';

@Component({
  selector: 'app-manage-user-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-user-groups.component.html',
  styleUrls: ['./manage-user-groups.component.css']
})
export class ManageUserGroupsComponent implements OnInit {
  userUUID!: string;
  assigned: GroupModel[] = [];
  available: GroupModel[] = [];
  year = '';

  constructor(
    private route: ActivatedRoute,
    private relationService: UserGroupRelationService,
    private groupsService: GroupsService
  ) {}

  ngOnInit(): void {
    const uuidParam = this.route.snapshot.paramMap.get('uuid');
    if (!uuidParam) {
      throw new Error('User UUID not provided in route');
    }
    this.userUUID = uuidParam;
    this.year = getCurrentAcademicYear();
    this.reloadAll();
  }

  private reloadAll(): void {
    this.loadAssigned();
    this.loadAvailable();
  }

  private loadAssigned(): void {
    this.relationService.getGroupsByUser(this.userUUID).subscribe({
      next: list => {
        this.assigned = list;
        this.filterAvailable();
      },
      error: err => {
        console.error('Error loading assigned groups:', err);
        Swal.fire('Error', 'Unable to load assigned groups.', 'error');
      }
    });
  }

  private loadAvailable(): void {
    this.groupsService.getGroupsByYear(this.year).subscribe({
      next: list => {
        this.available = list;
        this.filterAvailable();
      },
      error: err => {
        console.error('Error loading available groups:', err);
        Swal.fire('Error', 'Unable to load available groups.', 'error');
      }
    });
  }

  private filterAvailable(): void {
    const assignedIds = new Set(this.assigned.map(g => g.uuid));
    this.available = this.available.filter(g => !assignedIds.has(g.uuid));
  }

  add(group: GroupModel): void {
    this.relationService.addUserToGroup(this.userUUID, group.uuid).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: `Group "${group.name}" added`,
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        });
        this.reloadAll();
      },
      error: err => {
        Swal.fire('Error', err.error?.message || 'Could not assign group.', 'error');
      }
    });
  }

  confirmRemove(group: GroupModel): void {
    Swal.fire({
      title: `Remove "${group.name}" from user?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.relationService.removeUserFromGroup(this.userUUID, group.uuid).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: `Group "${group.name}" removed`,
              toast: true,
              position: 'top-end',
              timer: 2000,
              showConfirmButton: false
            });
            this.reloadAll();
          },
          error: err => {
            Swal.fire('Error', err.error?.message || 'Could not remove group.', 'error');
          }
        });
      }
    });
  }
}
