import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartTableComponent } from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { SmartPaginationComponent } from 'src/app/views/dashboard/shared/components/tables/smart-pagination/smart-pagination.component';
import { SmartTable1Component } from './smart-table1/smart-table1.component';

@NgModule({
  declarations: [
    SmartPaginationComponent,
    SmartTableComponent,
    SmartTable1Component,
  ],
  imports: [CommonModule],
})
export class SmartTableModule {}
