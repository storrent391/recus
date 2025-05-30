
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupModel } from '../../../models/groups/group.model';
import { GroupsService } from '../../../services/groups.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent implements OnInit {
  groupList: GroupModel[] = [];
  selectedGroupId = '';
  errorMessage = '';

  constructor(
    private groupsService: GroupsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  private loadGroups(): void {
    this.groupsService.getGroupsFromUser().subscribe({
      next: groups => {
        this.groupList = groups;
        this.errorMessage = '';
      },
      error: err => {
        this.errorMessage = 'Error loading groups: ' + (err.error?.message || err.message);
      }
    });
  }

  public viewSummary(): void {
    if (!this.selectedGroupId) {
      this.errorMessage = 'Please select a group.';
      return;
    }

    this.router.navigate(['/show-resume'], {
      queryParams: { groups: this.selectedGroupId }
    });
  }
}
