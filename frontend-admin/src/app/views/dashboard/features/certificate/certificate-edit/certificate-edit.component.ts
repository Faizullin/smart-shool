import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/base-component/base-edit/base-edit.component';
import { Certificate } from '../certificate';

@Component({
  selector: 'dashboard-certificate-edit',
  templateUrl: './certificate-edit.component.html',
  styleUrls: ['./certificate-edit.component.scss'],
})
export class CertificateEditComponent extends BaseEditComponent {
  public override action_urls = {
    detail: (id: number) => `/api/s/certificates/${id}`,
  };
  public override editInstance: Certificate | null = null;

  override ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    if (initialState.id) {
      this.fetchInstance(initialState.id);
    }
  }
  override patchFormValue(data: any) {
    // if(this.editInstance !== null) {
    // }
  }
}
