import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { Tag } from 'src/app/core/models/article';
import { Labwork } from 'src/app/core/models/labwork';
import { LabworkService } from 'src/app/core/services/labwork.service';
import { FileContentService } from 'src/app/core/services/file-content.service';
import { FiltersService } from 'src/app/core/services/filters.service';

interface IFilters {
  tags: Tag[];
}

@Component({
  selector: 'app-labwork-edit',
  templateUrl: './labwork-edit.component.html',
  styleUrls: ['./labwork-edit.component.scss'],
})
export class LabworkEditComponent {
  public form!: FormGroup;
  public validationErrors: {
    [key: string]: any;
  } = {};
  public editInstance: Labwork | null = null;
  public current_filters: IFilters = {
    tags: [],
  };
  public current_selected_filters: IFilters = {
    tags: [],
  };
  public multiselectTagDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'title',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private labworkService: LabworkService,
    private fileService: FileContentService,
    private filtersService: FiltersService,
    private fb: FormBuilder,
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    this.form = this.fb.group({
      title: ['', Validators.required],
      tags: [],
      target_audience: ['student'],
    });
    if (initialState.id) {
      this.fetchInstance(initialState.id);
    }
    this.filtersService.getFilters().subscribe({
      next: (filters) => {
        this.current_filters.tags = filters.tags;
      },
    });
  }
  get formControl() {
    return this.form.controls;
  }

  private fetchInstance(id?: number) {
    const item_id = this.editInstance !== null ? this.editInstance.id : id!;
    return this.labworkService.getLabwork(item_id).subscribe({
      next: (labwork) => {
        this.editInstance = { ...labwork } as Labwork;
        this.form.patchValue({
          title: this.editInstance.title,
          tags: this.editInstance.tags || [],
          target_audience: this.editInstance.target_audience,
        });
      },
    });
  }
  onTagItemSelect(item: any) {}
  onTagSelectAll(items: any) {}
  onFileUploadClick(): void {
    this.fileInput.nativeElement.click();
  }
  onFileUpload(event: any) {
    if (event.target.files.length > 0 && this.editInstance) {
      const file = event.target.files[0];
      this.uploadFile(file).subscribe({
        next: (file) => {
          this.fetchInstance();
        },
      });
    }
  }
  public onFileDetach(file_id: number) {
    if (this.editInstance) {
      this.fileService.deleteFile(file_id).subscribe({
        next: (labwork) => {
          this.fetchInstance();
        },
      });
    }
  }
  onSave() {
    if (this.form.valid) {
      const data = this.form.value;
      data['tag_ids'] = data.tags.map((item: Tag) => item.id);
      if (this.editInstance) {
        this.labworkService
          .updateLabwork(this.editInstance.id, data)
          .subscribe({
            next: (labwork) => {
              this.validationErrors = {};
              this.fetchInstance(labwork.id);
            },
            error: (error) => {
              if (error.status == 400 || error.status == 422) {
                const errors = { ...error.error };
                this.validationErrors = errors;
              }
            },
          });
      } else {
        this.labworkService.createLabwork(data).subscribe({
          next: (labwork) => {
            this.fetchInstance(labwork.id);
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
  uploadFile(file: File) {
    return this.fileService.uploadNewFile(
      file,
    );
  }
}
