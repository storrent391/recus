// src/app/show-sda/show-sda.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SdaService } from '../../../services/sda.service';
import { SdaModel } from '../../../models/sda/sda.model';
import { CriteriaSdaModel } from '../../../models/criiteria-sda/criteria-sda.model';
import { CompetencieSdaModel } from '../../../models/competencie-sda/competencie-sda.model';

@Component({
  selector: 'app-show-sda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-sda.component.html',
  styleUrls: ['./show-sda.component.css']
})
export class ShowSdaComponent implements OnInit {
  sda!: SdaModel;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private sdaService: SdaService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid) {
      this.errorMessage = 'SDA UUID not provided.';
      return;
    }

    this.sdaService.getSdaByUUID(uuid).subscribe({
      next: data => {
        this.sda = this.mapToModel(data);
      },
      error: err => {
        this.errorMessage = 'Error loading SDA: ' + (err.error?.message || err.message);
      }
    });
  }

  private mapToModel(data: any): SdaModel {
    
    const subjects = data.subjects.map((sub: any) => {
      const competencyModels = sub.competencies.map((comp: any) => {
        const criteriaModels: CriteriaSdaModel[] = comp.criteria.map((crit: any) => {
          return new CriteriaSdaModel(
            crit.criteriaUUID,
            crit.criteriaUUIDTPL,
            crit.criteriaDescription,
            crit.criteriaMainOrder,
            crit.criteriaOrder,
            crit.criteriaWorked
          );
        });
        return new CompetencieSdaModel(
          comp.competencyUUID,
          comp.competencyUUIDTPL,
          comp.competencyDescription,
          comp.competencyOrder,
          comp.competencyWorked,
          comp.competencyType,
          criteriaModels,
          true // default expanded
        );
      });
      return {
        subjectUUID: sub.subjectUUID,
        subjectName: sub.subjectName,
        subjectTemplate: sub.subjectTemplate,
        competencies: competencyModels
      };
    });

    return {
      sdaUUID: data.sdaUUID,
      title: data.title,
      description: data.description,
      groupName: data.groupName,
      createdAt: data.createdAt,
      subjects
    } as SdaModel;
  }

  toggleCompetency(competency: CompetencieSdaModel): void {
    competency.expanded = !competency.expanded;
  }

  onCriteriaChange(
    event: Event,
    crit: CriteriaSdaModel,
    compModel: CompetencieSdaModel
  ): void {
    const input = event.target as HTMLInputElement;
    const newState = input.checked;
    if (this.sda) {
      this.sdaService
        .markCriteria(
          this.sda.sdaUUID,
          crit.criteriaUUID,
          compModel.competencyUUID,
          newState
        )
        .subscribe({
          next: res => {
            crit.criteriaWorked = newState;
            compModel.competencyWorked = res.competencyWorked;
          },
          error: () => {
            // Optional: revert checkbox if error
            crit.criteriaWorked = !newState;
          }
        });
    }
  }
}
