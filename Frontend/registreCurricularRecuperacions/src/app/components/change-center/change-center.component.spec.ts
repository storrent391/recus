import { of } from 'rxjs';
import { ChangeCenterComponent } from './change-center.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';


describe('ChangeCenterComponent', () => {
  let comp: ChangeCenterComponent;
  let fixture;
  const mockCenters = [{ centerName: 'Centro1', role: 1 }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeCenterComponent],
      providers: [
        {
          provide: AuthService,
          useValue: { listMyCenters: () => of(mockCenters) }
        },
        { provide: Router, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeCenterComponent);
    comp = fixture.componentInstance;
  });

  it('should create the component instance', () => {
    expect(comp).toBeTruthy();
  });

  it('loadCenters() should populate centers with data from the service', () => {
    comp.loadCenters();
    expect(comp.centers).toEqual(mockCenters);
  });
  it('loadCenters(): should set errorMessage when service fails', () => {
  const mockError = { error: { message: 'Load failed' } };
  auth.listMyCenters.and.returnValue(throwError(() => mockError));

  comp.loadCenters();

  expect(comp.centers).toEqual([]);
  expect(comp.errorMessage).toBe('Load failed');
});
});
