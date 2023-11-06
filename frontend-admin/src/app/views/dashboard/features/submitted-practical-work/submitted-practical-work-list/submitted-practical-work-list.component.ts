import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/components/base-component/base-list/base-list.component';
import { SubmittedPracticalWork } from './../submitted-practical-work';

@Component({
  selector: 'app-submitted-practical-work-list',
  templateUrl: './submitted-practical-work-list.component.html',
  styleUrls: ['./submitted-practical-work-list.component.scss'],
})
export class SubmittedPracticalWorkListComponent extends BaseListComponent<SubmittedPracticalWork> {
  public override action_urls: { [key: string]: Function } = {
    list: () => `/api/s/submitted-practical-works/`,
    delete: (id: number) => `/api/s/submitted-practical-works/${id}/`,
  };
}
