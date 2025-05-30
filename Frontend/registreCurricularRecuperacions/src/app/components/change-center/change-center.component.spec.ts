import { of, throwError } from 'rxjs';
import { ChangeCenterComponent } from './change-center.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';


describe('ChangeCenterComponent', () => {
  let comp: ChangeCenterComponent;
  const mockCenters = [{ centerName: 'Centro1', role: 1 }];
  
  let fixture: ComponentFixture<ChangeCenterComponent>;
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    auth = jasmine.createSpyObj('AuthService', ['listMyCenters', 'chooseCenterProtected']);
    router = jasmine.createSpyObj('Router', ['navigate']);
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

  it('onSelectCenter(): should call handleSuccess() on success', () => {
    const mockToken = 'abc123';
    auth.chooseCenterProtected.and.returnValue(of({ token: mockToken }));
    spyOn(comp, 'handleSuccess');

    const selected = { centerName: 'TestCenter', role: 1 };
    comp.onSelectCenter(selected);

    expect(comp.handleSuccess).toHaveBeenCalledWith(mockToken);
  });

  it('onSelectCenter(): should call handleError() on error', () => {
  const error = { message: 'Failed to choose center' };
  auth.chooseCenterProtected.and.returnValue(throwError(() => error));
  spyOn(comp, 'handleError');

  const selected = { centerName: 'FailCenter', role: 2 };
  comp.onSelectCenter(selected);

  expect(comp.handleError).toHaveBeenCalledWith(error);
  });

  it('handleSuccess(): should store token and navigate to dashboard', () => {
    spyOn(localStorage, 'setItem');

    comp.handleSuccess('my-token');

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'my-token');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('handleError(): should extract message from error object', () => {
    comp.handleError({ error: { message: 'center error' } });
    expect(comp.errorMessage).toBe('center error');

    comp.handleError({ message: 'fallback message' });
    expect(comp.errorMessage).toBe('fallback message');

    comp.handleError({});
    expect(comp.errorMessage).toBe('Unknown error');
  });


});
