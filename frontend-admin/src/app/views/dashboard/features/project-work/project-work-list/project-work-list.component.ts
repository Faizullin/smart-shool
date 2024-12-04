import { Component } from '@angular/core';
import { ProjectWorkViewComponent } from '../project-work-view/project-work-view.component';
import {
  BaseListComponent,
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { ProjectWork } from '../project-work';
import { ResultEditComponent } from '../../result/result-edit/result-edit.component';
import { Result } from '../../result/result';
import { FilterTemplate } from '../../../shared/components/tables/smart-table1/smart-table1.component';
import { map } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-project-work-list',
  templateUrl: './project-work-list.component.html',
  styleUrls: ['./project-work-list.component.scss'],
})
export class ProjectWorkListComponent {
  constructor(private modalService: BsModalService) {}
  public table_title = 'Project Works';
  public actions: ITablesActionData<ProjectWork> = {
    list: {
      use: true,
      url: () => `/api/s/project-works/`,
    },
    edit: {
      use: true,
      component: ProjectWorkViewComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/project-works/${id}/`,
    },
  };
  public columns: ITableColumn<ProjectWork>[] = [
    {
      header: 'Id',
      field: 'id',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Exam',
      field: 'submit_exam',
    },
    {
      header: 'Result',
      field: 'result',
    },
    {
      header: 'Created At',
      field: 'created_at',
      sortable: true,
      filter: {
        type: 'date',
      },
    },
    // {
    //   header: 'Updated At',
    //   field: 'updated_at',
    //   sortable: true,
    //   filter: {
    //     type: 'date',
    //   },
    // },
  ];

  bsModalRef?: BsModalRef<any>;
  public onResultEditOpen(item: Result) {
    const initialState: any = {
      id: item.id,
    };
    this.bsModalRef = this.modalService.show(ResultEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
  public onOpenView(project_id: number) {
    const initialState: any = {};
    if (project_id !== undefined) {
      initialState.id = project_id;
    }
    this.bsModalRef = this.modalService.show(ProjectWorkViewComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
