import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/base-component/base-list/base-list.component';
import { ArticleEditComponent } from '../article-edit/article-edit.component';

@Component({
  selector: 'dashboard-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent<Article> extends BaseListComponent<Article> {
  public override table_title = 'Articles';
  public override action_urls = {
    list: () => `/api/s/articles/`,
  };

  override openEditModal(initialState: any) {
    this.bsModalRef = this.modalService.show(ArticleEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}