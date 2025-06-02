
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService, ResumeRow } from '../../../services/groups.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './show-resume.component.html',
  styleUrls: ['./show-resume.component.css']
})
export class ShowResumeComponent implements OnInit {
  resumeRows: ResumeRow[] = [];
  
  groupedSubjects: Array<{
    subjectName: string;
    competencies: Array<{ competencyName: string; rows: ResumeRow[]; expanded: boolean }>;
    expanded: boolean;
  }> = [];
  errorMessage = '';
  showUnworked = false;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService
  ) {}

  ngOnInit(): void {
    const groupsParam = this.route.snapshot.queryParamMap.get('groups');
    if (!groupsParam) {
      this.errorMessage = 'No group specified.';
      return;
    }
    const groupIds = groupsParam.split(',').map(s => s.trim());
    this.groupsService.getResume(groupIds).subscribe({
      next: data => {
        this.resumeRows = data;
        this.buildGrouped(data);
      },
      error: err => {
        this.errorMessage =
          'Error fetching resume: ' + (err.error?.message || err.message);
      }
    });
  }

  private buildGrouped(rows: ResumeRow[]): void {
    
    rows.sort((a, b) => {
      const sCmp = a.Subject.localeCompare(b.Subject);
      if (sCmp !== 0) return sCmp;
      if (a.OrderByCompetency !== b.OrderByCompetency) {
        return a.OrderByCompetency - b.OrderByCompetency;
      }
      if (a.OrderByMainCriteria !== b.OrderByMainCriteria) {
        return a.OrderByMainCriteria - b.OrderByMainCriteria;
      }
      return a.OrderByCriteria - b.OrderByCriteria;
    });

    const subjectMap = new Map<
      string,
      { competencyMap: Map<string, ResumeRow[]>; expanded: boolean }
    >();

    
    for (const row of rows) {
      if (!subjectMap.has(row.Subject)) {
        subjectMap.set(row.Subject, {
          competencyMap: new Map<string, ResumeRow[]>(),
          expanded: false
        });
      }
      const subjEntry = subjectMap.get(row.Subject)!;

      if (!subjEntry.competencyMap.has(row.CompetencyDescription)) {
        subjEntry.competencyMap.set(row.CompetencyDescription, []);
      }
      subjEntry
        .competencyMap
        .get(row.CompetencyDescription)!
        .push(row);
    }

    
    this.groupedSubjects = Array.from(subjectMap.entries()).map(
      ([subjectName, { competencyMap, expanded }]) => ({
        subjectName,
        expanded,
        competencies: Array.from(competencyMap.entries()).map(
          ([competencyName, rows]) => ({
            competencyName,
            rows,
            expanded: false
          })
        )
      })
    );
  }

  toggleSubject(subject: {
    subjectName: string;
    competencies: Array<{ competencyName: string; rows: ResumeRow[]; expanded: boolean }>;
    expanded: boolean;
  }): void {
    subject.expanded = !subject.expanded;
  }

  toggleCompetency(
    competency: { competencyName: string; rows: ResumeRow[]; expanded: boolean }
  ): void {
    competency.expanded = !competency.expanded;
  }
}
