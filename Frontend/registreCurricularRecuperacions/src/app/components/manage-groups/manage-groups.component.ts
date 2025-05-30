import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../../services/groups.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-groups',
  standalone: true,
  template: ''
})
export class ManageGroupsComponent implements OnInit {
  groups: any[] = [];
  originalNames: Record<string, string> = {};

  showForm = false;
  newGroupName = '';
  newCourse = '';

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.groupsService.getGroupsByYear('').subscribe({
      next: list => {
        this.groups = list;
        this.originalNames = {};
        list.forEach(g => (this.originalNames[g.uuid] = g.name));
      },
      error: () => {
        Swal.fire('Error', 'Unable to load groups.', 'error');
      }
    });
  }

  public toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newGroupName = '';
      this.newCourse = '';
    }
  }
}
