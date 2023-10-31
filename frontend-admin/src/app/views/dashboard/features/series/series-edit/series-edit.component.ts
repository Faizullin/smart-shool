import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Series } from 'src/app/core/models/series';
import { FiltersService } from 'src/app/core/services/filters.service';

interface IFilters {
  documents: Document[];
}

@Component({
  selector: 'app-series-edit',
  templateUrl: './series-edit.component.html',
  styleUrls: ['./series-edit.component.scss'],
})
export class SeriesEditComponent implements OnInit {
  public form!: FormGroup;
  public validationErrors: {
    [key: string]: any;
  } = {};
  public editInstance: Series | null = null;
  public multiselectDocumentDropdownSettings: IDropdownSettings = {
    idField: 'id',
    textField: 'title',
    // itemsShowLimit: 3,
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: false,
    allowRemoteDataSearch: true,
  };
  public current_filters: IFilters = {
    documents: [],
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private filtersService: FiltersService,
  ) {}

  ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    this.form = this.fb.group({
      title: ['', Validators.required],
      documents:[],
    });
    if (initialState.id) {
      this.http.get(`/api/s/series/${initialState.id}/`).subscribe({
        next: (quiz) => {
          this.editInstance = { ...quiz } as Series;
          this.form.patchValue({
            title: this.editInstance.title,
            documents: this.editInstance.documents || [],
          });
        },
      });
    }
  }
  get formControl() {
    return this.form.controls;
  }
  public onSave() {
    if (this.form.valid) {
      const data = this.form.value;
      data.document_ids = data.documents?.map((item: any) => item.id) || [];
      console.log(data)
      if (this.editInstance === null) {
        this.http.post(`/api/s/series/`, data).subscribe({
          next: (item) => {
            this.editInstance = { ...item } as Series;
            this.form.patchValue({
              title: this.editInstance.title,
              documents: this.editInstance.documents || [],
            });
            this.validationErrors = {};
          },
          error: (error) => {
            if (error.status == 400 || error.status == 422) {
              const errors = { ...error.error };
              this.validationErrors = errors;
            }
          },
        })
      } else {
        this.http.patch(`/api/s/series/${this.editInstance.id}/`, data).subscribe({
          next: (item) => {
            this.editInstance = { ...item } as Series;
            this.form.patchValue({
              title: this.editInstance.title,
              documents: this.editInstance.documents || [],
            });
            this.validationErrors = {};
          },
          error: (error) => {
            if (error.status == 400 || error.status == 422) {
              const errors = { ...error.error };
              this.validationErrors = errors;
            }
          },
        });
      }
    }
  }
  public onFilterChange(filter: any) {
    this.filtersService
      .getDocumentFilters({
        search: filter,
      })
      .subscribe({
        next: (filters) => {
          this.current_filters.documents = filters.results;
        },
      });
  }
}
