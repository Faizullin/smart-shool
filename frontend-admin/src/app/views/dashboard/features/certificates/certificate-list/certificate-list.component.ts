import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/base-component/base-list/base-list.component';
import { CertificateEditComponent } from '../certificate-edit/certificate-edit.component';
import { Certificate } from './../certificate';

@Component({
  selector: 'dashboard-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
})
export class CertificateListComponent<Certificate> extends BaseListComponent<Certificate> {
  public override table_title = 'Certificates';
  public override action_urls = {
    list: () => `/api/s/certificates/`,
  };

  override openEditModal(initialState: any) {
    this.bsModalRef = this.modalService.show(CertificateEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
