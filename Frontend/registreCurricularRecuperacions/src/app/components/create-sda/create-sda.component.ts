// src/app/create-sda/create-sda.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsService } from '../../../services/groups.service';
import { CoursesService } from '../../../services/courses.service';
import { SubjectsService } from '../../../services/subjects.service';
import { SdaService } from '../../../services/sda.service';
import { CreateSdaModel } from '../../../models/create-sda/createSda.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Group {
  uuid: string;
  name: string;
  courseName: string;
}

interface Subject {
  uuid: string;
  name: string;
}

@Component({
  selector: 'app-create-sda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-sda.component.html',
  styleUrls: ['./create-sda.component.css']
})
export class CreateSdaComponent implements OnInit {
  sdaTitle = '';
  sdaDescription = '';
  groups: Group[] = [];
  selectedGroupId = '';
  subjects: Subject[] = [];
  chosenSubjectIds: string[] = [];
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private groupsService: GroupsService,
    private coursesService: CoursesService,
    private subjectsService: SubjectsService,
    private sdaService: SdaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUserGroups();
  }

  private fetchUserGroups(): void {
    this.groupsService.getGroupsFromUser().subscribe({
      next: list => {
        this.groups = list;
        this.errorMessage = '';
      },
      error: err => {
        this.errorMessage = 'Error loading groups: ' + (err.error?.message || err.message);
      }
    });
  }

  onGroupChange(): void {
    this.subjects = [];
    this.chosenSubjectIds = [];

    const group = this.groups.find(g => g.uuid === this.selectedGroupId);
    if (!group) {
      return;
    }

    this.coursesService.getTemplateByCourseName(group.courseName).subscribe({
      next: tpl => {
        this.subjectsService.getSubjectsByTemplate(tpl.templateName).subscribe({
          next: subs => this.subjects = subs,
          error: err => {
            this.errorMessage = 'Error loading subjects: ' + (err.error?.message || err.message);
          }
        });
      },
      error: err => {
        this.errorMessage = 'Error fetching template: ' + (err.error?.message || err.message);
      }
    });
  }

  onSubjectToggle(subjectId: string, checked: boolean): void {
    if (checked) {
      this.chosenSubjectIds.push(subjectId);
    } else {
      this.chosenSubjectIds = this.chosenSubjectIds.filter(id => id !== subjectId);
    }
  }

  createSda(): void {
    this.errorMessage = '';
    if (!this.sdaTitle.trim() || !this.sdaDescription.trim() || !this.selectedGroupId) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.isSubmitting = true;
    const payload = new CreateSdaModel(
      this.sdaTitle,
      this.sdaDescription,
      this.selectedGroupId
    );

    this.sdaService.createSDA(payload).subscribe({
      next: res => {
        const newSdaId = res.uuid;
        if (this.chosenSubjectIds.length) {
          this.sdaService.createCompleteSDA(newSdaId, this.chosenSubjectIds).subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: e => {
              this.errorMessage = 'Error completing SDA: ' + (e.error?.message || e.message);
              this.isSubmitting = false;
            }
          });
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: e => {
        this.errorMessage = 'Error creating SDA: ' + (e.error?.message || e.message);
        this.isSubmitting = false;
      }
    });
  }
}