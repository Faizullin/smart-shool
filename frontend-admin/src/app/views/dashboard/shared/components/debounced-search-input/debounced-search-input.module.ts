import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebouncedSearchInputComponent } from './debounced-search-input.component';
import {
  ButtonGroupModule,
  ButtonModule,
  FormModule,
  GridModule,
  ProgressModule,
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DebouncedSearchInputComponent],
  imports: [
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    FormsModule,
    ButtonGroupModule,
  ],
  exports: [DebouncedSearchInputComponent],
})
export class DebouncedSearchInputModule {}
