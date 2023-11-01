import { Component } from '@angular/core';
import { Result } from 'src/app/core/models/result';
import { BaseListComponent } from '../../../shared/components/base-component/base-list/base-list.component';
import { ResultEditComponent } from '../result-edit/result-edit.component';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent extends BaseListComponent<Result> {
  public override table_title = 'Results';
  public override action_urls = {
    list: () => `/api/s/results/`,
    delete: (id: number) => `/api/s/results/${id}/`,
  };
  override openEditModal(initialState: any) {
    this.bsModalRef = this.modalService.show(ResultEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
