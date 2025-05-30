import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ChooseCenterComponent } from './choose-center.component';

describe('ChooseCenterComponent', () => {
  let fixture: ComponentFixture<ChooseCenterComponent>;
  let comp: ChooseCenterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseCenterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseCenterComponent);
    comp = fixture.componentInstance;
  });

  it('should create the component instance', () => {
    expect(comp).toBeTruthy();
  });

  it('ngOnInit(): should set errorMessage when no temp data', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    comp.ngOnInit();

    expect(comp.errorMessage).toBe('No center data.');
    expect(comp.userId).toBe('');
    expect(comp.availableCenters).toEqual([]);
  });
});
