import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/base-component/base-edit/base-edit.component';
import { Result } from 'src/app/core/models/result';

@Component({
  selector: 'app-result-edit',
  templateUrl: './result-edit.component.html',
  styleUrls: ['./result-edit.component.scss'],
})
export class ResultEditComponent extends BaseEditComponent {
  public override action_urls = {
    detail: (id: number) => `/api/s/results/${id}/`,
    post: () => `/api/s/quizzes/`,
  };
  public override editInstance: Result | null = null;
}
