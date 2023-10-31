import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/base-component/base-edit/base-edit.component';
import { Exam } from '../exam';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.scss'],
})
export class ExamEditComponent extends BaseEditComponent {
  public override action_urls = {
    detail: (id: number) => `/api/s/exams/${id}/`,
    post: () => `/api/s/exams/`,
  };
  public override editInstance: Exam | null = null;
  public exam_types = [
    { value: 'i', label: 'Initial' },
    { value: 'm', label: 'Mid-term' },
    { value: 'f', label: 'Final' },
  ];
  // constructor(
  //   private articleService: ArticleService,
  //   private fileService: FileContentService,
  //   fb: FormBuilder,
  //   modalService: BsModalService,
  //   http: HttpClient,
  // ) {
  //   super(fb, modalService, http);
  // }

  override ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    this.form = this.fb.group({
      exam_type: [],
      subjects: [[]],
    });
    if (initialState.id) {
      this.fetchInstance(initialState.id);
    }
  }
  protected override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      const exam_type = this.exam_types.find(
        (item) => item.value === this.editInstance?.exam_type,
      );
      this.form.patchValue({
        exam_type: exam_type !== undefined ? [exam_type] : null,
        subjects: this.editInstance.subject ? [this.editInstance.subject] : [],
      });
    }
  }
  override onSave() {
    if (this.form.valid) {
      const data = this.form.value;
      data['subject_id'] =
        data.subjects.length > 0 ? data.subjects[0].id : null;
      data['exam_type'] =
        data.exam_type.length > 0 ? data.exam_type[0].value : null;
      this.fetchSave(data);
    }
  }
}
