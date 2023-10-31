import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/base-component/base-edit/base-edit.component';
import { Student } from '../student';

@Component({
  selector: 'dashboard-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent extends BaseEditComponent {
  public override action_urls = {
    detail: (id: number) => `/api/s/students/${id}`,
  };
  public override editInstance: Student | null = null;

  override ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    if (initialState.id) {
      this.fetchInstance(initialState.id);
    }
  }
  override patchFormValue(data: any) {
    if(this.editInstance !== null) {
      this.editInstance.subject_group = data.current_group
    }
  }
}
