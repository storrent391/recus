import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ManageGroupsComponent } from './manage-groups.component';
import { GroupsService } from '../../../services/groups.service';
import Swal from 'sweetalert2';
import { GroupModel } from '../../../models/groups/group.model';


const mockGroups: GroupModel[] = [
  new GroupModel('1', 'Alpha', 'Center A', '1st', '2025-26')
];

  describe('ManageGroupsComponent', () => {
    let fixture: ComponentFixture<ManageGroupsComponent>;
    let comp: ManageGroupsComponent;
    let groupsService: jasmine.SpyObj<GroupsService>;

    beforeEach(async () => {
      groupsService = jasmine.createSpyObj('GroupsService', [
        'getGroupsByYear',
        'createGroup',
        'updateGroupName',
        'deleteGroup'
      ]);

      
      groupsService.getGroupsByYear.and.returnValue(of(mockGroups));

      spyOn(Swal, 'fire').and.returnValue(Promise.resolve<any>({ isConfirmed: true }));

      await TestBed.configureTestingModule({
        imports: [ManageGroupsComponent],
        providers: [
          { provide: GroupsService, useValue: groupsService }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(ManageGroupsComponent);
      comp = fixture.componentInstance;
    });

    it('should create the component', () => {
      expect(comp).toBeTruthy();
    });

    it('ngOnInit(): loads groups and sets originalNames', fakeAsync(() => {
      comp.ngOnInit();
      tick();
      expect(groupsService.getGroupsByYear).toHaveBeenCalled();
      expect(comp.groups).toEqual(mockGroups);
      expect(comp.originalNames).toEqual({ '1': 'Alpha' });
    }));

    it('ngOnInit(): shows error alert on failure', fakeAsync(() => {
      groupsService.getGroupsByYear.and.returnValue(throwError(() => ({ error: {} })));
      comp.ngOnInit();
      tick();
      expect(Swal.fire).toHaveBeenCalledWith('Error', 'Unable to load groups.', 'error');
    }));
    it('toggleForm(): should toggle showForm and reset inputs', () => {
      
      comp.showForm = false;
      comp.newGroupName = 'TestName';
      comp.newCourse = '1st';

      
      comp.toggleForm();
      expect(comp.showForm).toBeTrue();

      
      comp.toggleForm();
      expect(comp.showForm).toBeFalse();
      expect(comp.newGroupName).toBe('');
      expect(comp.newCourse).toBe('');
    });
    it('submitNewGroup(): should warn when group name is empty', () => {
      spyOn(Swal, 'fire');
      comp.newGroupName = '';
      comp.newCourse = '1st';

      comp.submitNewGroup();

      expect(Swal.fire).toHaveBeenCalledWith(
        'Validation',
        'Group name is required.',
        'warning'
      );
    });
    it('submitNewGroup(): should warn when group name is too long', () => {
      spyOn(Swal, 'fire');
      comp.newGroupName = 'x'.repeat(31);
      comp.newCourse = '1st';

      comp.submitNewGroup();

      expect(Swal.fire).toHaveBeenCalledWith(
        'Validation',
        'Group name cannot exceed 30 characters.',
        'warning'
      );
    });
    it('submitNewGroup(): should warn when course selection is empty', () => {
      spyOn(Swal, 'fire');
      comp.newGroupName = 'ValidName';
      comp.newCourse = ''; 

      comp.submitNewGroup();

      expect(Swal.fire).toHaveBeenCalledWith(
        'Validation',
        'Course selection is required.',
        'warning'
      );
    });
    it('saveName(): should not call updateGroupName if name is unchanged', fakeAsync(() => {
    
      const group = new GroupModel('1', 'Alpha', 'Center A', '1st', '2025-26');
      comp.groups = [group];
      comp.originalNames = { '1': 'Alpha' };

      
      const updateSpy = groupsService.updateGroupName
        .and.returnValue(of(group));

      comp.saveName(group);
      tick();

      expect(updateSpy).not.toHaveBeenCalled();
    }));
  
});
