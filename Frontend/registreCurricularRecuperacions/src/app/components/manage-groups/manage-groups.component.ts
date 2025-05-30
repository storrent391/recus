import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-manage-groups',
  standalone: true,
  template: ''
})
export class ManageGroupsComponent implements OnInit {
  groups: any[] = [];
  originalNames: Record<string, string> = {};

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.groupsService.getGroupsByYear('').subscribe(list => {
      this.groups = list;
      this.originalNames = {};
      list.forEach(g => (this.originalNames[g.uuid] = g.name));
    });
  }
}
