import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/components/base-component/base-list/base-list.component';
import { AssignableStudentResult } from '../assignable-student-result';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Result } from 'src/app/core/models/result';
import { ResultEditComponent } from '../../result/result-edit/result-edit.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ISubject } from '../../subject/subject';
import { ISubjectGroup } from '../subject-group';

interface ISubjectGroupData {
  label: string;
  id: string;
  subject_id: number;
}

@Component({
  selector: 'app-subject-group-assign',
  templateUrl: './subject-group-assign.component.html',
  styleUrls: ['./subject-group-assign.component.scss'],
})
export class SubjectGroupAssignComponent extends BaseListComponent<AssignableStudentResult> {
  public override table_title = 'Subject Groups Assign';
  public override action_urls = {
    list: () => `/api/s/subject-groups/assign/`,
    post: () => `/api/s/subject-groups/assign/`,
  };
  public configured_data: {
    [key: string]: Result[];
  } = {};
  public configured_subject_group_data: ISubjectGroupData[] = [];
  public form!: FormGroup;
  constructor(
    http: HttpClient,
    modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    super(http, modalService);
  }
  override ngOnInit() {
    this.form = this.fb.group({
      subjects: this.fb.array([]),
    });
    super.ngOnInit();
  }
  get formSubjects(): FormArray {
    return this.form.get('subjects') as FormArray;
  }
  protected override fetchData() {
    this.loading.list = true;
    this.configured_subject_group_data = [];
    this.configured_data = {};
    this.fetchDataRequest({
      ...this.filterParams,
      search: this.filterParams.filterText,
    }).subscribe({
      next: (data) => {
        this.data = data.results;
        this.totalPages = data.count;
        this.configureData(this.data);
      },
    });
  }
  private configureData(data: Result[]) {
    this.configured_data = {};
    const configured_subject_group_data: ISubjectGroupData[] = [];
    const subjects_form_array = this.form.get('subjects') as FormArray;
    data.forEach((item) => {
      const data_subject_item = item.exam?.subject;
      if (data_subject_item?.id) {
        const item_keys = {
          low: this.getSubjectDataKey(`${data_subject_item.id}`, 'low'),
          high: this.getSubjectDataKey(`${data_subject_item.id}`, 'high'),
        };
        let seacrh_index;
        seacrh_index = configured_subject_group_data.findIndex(
          (data_item) => data_item.id == item_keys.low,
        );
        if (seacrh_index === -1) {
          const label = `Group for ${data_subject_item.title} LOW`;
          configured_subject_group_data.push({
            id: item_keys.low,
            label,
            subject_id: data_subject_item.id,
          });
          subjects_form_array.push(
            this.fb.group({
              title: label,
              subject_id: data_subject_item.id,
            }),
          );
          this.configured_data[item_keys.low] = [];
        }
        seacrh_index = configured_subject_group_data.findIndex(
          (data_item) => data_item.id == item_keys.high,
        );
        if (seacrh_index === -1) {
          const label = `Group for ${data_subject_item.title} HIGH`;
          configured_subject_group_data.push({
            id: item_keys.high,
            label,
            subject_id: data_subject_item.id,
          });
          subjects_form_array.push(
            this.fb.group({
              title: label,
              subject_id: data_subject_item.id,
            }),
          );
          this.configured_data[item_keys.high] = [];
        }
        if (item.theory_score < this.min_assignment_theory_score) {
          this.configured_data[item_keys.low].push(item);
        } else {
          this.configured_data[item_keys.high].push(item);
        }
      } else {
        console.error('Something with data is wrong');
      }
    });
    this.configured_subject_group_data = [...configured_subject_group_data];
  }
  private getSubjectDataKey(id: string, level: string): string {
    return `${id}_${level}`;
  }
  public onResultEditOpen(item: Result) {
    const initialState: any = {
      id: item.id,
    };
    this.bsModalRef = this.modalService.show(ResultEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }

  public onSave() {
    const formValue = this.form.value;
    const students_list_data: { students: number[] }[] = [];
    const subjects_list_data: { title: string; subject_id: string }[] = [];
    this.configured_subject_group_data.forEach((key, index) => {
      const student_ids = this.configured_data[key.id].map(
        (item) => item.student?.id!,
      );
      if (student_ids.length > 0 && formValue.subjects[index].subject_id) {
        students_list_data.push({
          students: student_ids,
        });
        subjects_list_data.push({
          title: formValue.subjects[index].title,
          subject_id: formValue.subjects[index].subject_id,
        });
      }
    });
    this.http
      .post(`/api/s/subject-groups/`, subjects_list_data)
      .pipe(
        map((data) => {
          return [...(data as ISubjectGroup[])];
        }),
      )
      .subscribe({
        next: (subjects_data: ISubjectGroup[]) => {
          const subject_groups_assign_data: {
            subject_group_id: number;
            student_id: number;
          }[] = [];
          subjects_data.forEach((subject_group_item, index) => {
            students_list_data[index].students.forEach((student_item) => {
              subject_groups_assign_data.push({
                subject_group_id: subject_group_item.id,
                student_id: student_item,
              });
            });
          });
          this.http
            .post(this.action_urls['post'](), subject_groups_assign_data)
            .pipe(
              map((data: any) => {
                const data_results = data.results || [];
                const data_total_items = data.count || 0;
                return {
                  results: data_results.map(function (data_results: any) {
                    return {
                      ...data_results,
                    };
                  }),
                  count: data_total_items,
                };
              }),
            )
            .subscribe({
              next: (data) => {
                this.router.navigate(['dashboard','subject-groups','list']);
              },
            });
        },
      });
  }

  drop(event: CdkDragDrop<Result[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  private min_assignment_theory_score = 50;
}
