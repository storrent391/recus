import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ManageGroupsComponent } from './manage-groups.component';
import { GroupsService } from '../../../services/groups.service';

describe('ManageGroupsComponent', () => {
  let fixture: ComponentFixture<ManageGroupsComponent>;
  let comp: ManageGroupsComponent;
  let groupsService: jasmine.SpyObj<GroupsService>;

  const mockList = [
    { uuid: '1', name: 'Alpha', courseName: '1st', year: '2025-26' }
  ];

  beforeEach(async () => {
    groupsService = jasmine.createSpyObj('GroupsService', ['getGroupsByYear']);
    
    groupsService.getGroupsByYear.and.returnValue(of(mockList as any));

    await TestBed.configureTestingModule({
      imports: [ManageGroupsComponent],
      providers: [
        { provide: GroupsService, useValue: groupsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageGroupsComponent);
    comp    = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(comp).toBeTruthy();
  });

  it('ngOnInit(): should call getGroupsByYear and set groups + originalNames', () => {
    comp.ngOnInit();
    expect(groupsService.getGroupsByYear).toHaveBeenCalledWith('');
    expect(comp.groups).toEqual(mockList);
    expect(comp.originalNames).toEqual({ '1': 'Alpha' });
  });
});
