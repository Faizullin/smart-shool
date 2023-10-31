import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Question, Quiz } from 'src/app/core/models/quiz';
import { QuizService } from 'src/app/core/services/quiz.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  FilterParams,
  TableColumn,
} from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FiltersService } from 'src/app/core/services/filters.service';

interface IFilters {
  documents: Document[];
}

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss'],
})
export class QuizEditComponent implements OnInit {
  public form!: FormGroup;
  public questionForm!: FormGroup;
  public validationErrors: {
    [key: string]: any;
  } = {};
  public editQuizInstance: Quiz | null = null;
  public editQuestionInstance: Question | null = null;
  public multiselectDocumentDropdownSettings: IDropdownSettings = {
    idField: 'id',
    textField: 'title',
    // itemsShowLimit: 3,
    singleSelection: true,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: false,
    allowRemoteDataSearch: true,
  };
  public current_filters: IFilters = {
    documents: [],
  };

  public columns: TableColumn<Question>[] = [
    {
      header: 'Id',
      field: 'id',
      cellTemplate: (data: Question) => `<strong>${data.id}</strong>`,
    },
    {
      header: 'Prompt',
      field: 'prompt',
    },
    {
      header: 'Answers Count',
      field: 'answers_count',
      cellTemplate: (data: Question) => `${data.answers_count}`,
    },
    {
      header: 'Created At',
      field: 'created_at',
      cellTemplate: (data: Question) => `${data.created_at}`,
    },
    {
      header: 'Updated At',
      field: 'updated_at',
      cellTemplate: (data: Question) => `${data.updated_at}`,
    },
  ];

  constructor(
    private quizService: QuizService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private filtersService: FiltersService,
  ) { }

  ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    this.form = this.fb.group({
      title: ['', Validators.required],
      quiz_type: ['', Validators.required],
      document: [[], Validators.required],
      questions: this.fb.array([new FormControl('')]),
    });
    this.questionForm = this.fb.group({
      prompt: new FormControl('', Validators.required),
      answers: this.fb.array([]),
    });
    if (initialState.id) {
      this.quizService.getQuiz(initialState.id).subscribe({
        next: (quiz) => {
          this.editQuizInstance = { ...quiz } as Quiz;
          this.form.patchValue({
            title: this.editQuizInstance.title,
            quiz_type: this.editQuizInstance.quiz_type,
            document: this.editQuizInstance.document
              ? [this.editQuizInstance.document]
              : [],
            questions: [],
          });
          this.fetchQuizQuestions();
        },
      });
    }
  }

  onEditQuestionOpen(item: Question) {
    if (this.editQuizInstance !== null && item.id !== undefined) {
      this.quizService
        .getQuestion(this.editQuizInstance.id, item.id)
        .subscribe({
          next: (question_item) => {
            this.editQuestionInstance = question_item;
            this.questionAnswers.clear();
            this.questionForm.patchValue({
              prompt: item.prompt,
            });
            item.answers.map((item) => {
              const form = this.fb.group({
                content: item.content,
                correct: item.correct,
              });
              this.questionAnswers.push(form);
            });
          },
        });
    }
  }
  onDeleteQuestion(item: Question) {
    if (this.editQuizInstance !== null && item.id !== undefined) {
      this.quizService
        .deleteQuestion(this.editQuizInstance.id, item.id)
        .subscribe({
          next: () => {
            if (this.editQuestionInstance?.id === item.id) {
              this.editQuestionInstance = null;
              this.questionForm.reset();
            }
            this.fetchQuizQuestions();
          },
        });
    }
  }
  onRemoveQuestionAnswer(answerIndex: number) {
    (this.questionForm.get('answers') as FormArray).removeAt(answerIndex);
  }

  public filterParams: FilterParams = {
    page: 1,
    page_size: 10,
    filterText: '',
    ordering: 'id',
  };
  public currentQuestionPage?: number;

  onPageSizeChange(pageSize: number) {
    this.filterParams.page_size = pageSize;
    this.filterParams.page = 1;
    this.fetchQuizQuestions();
  }
  onPageChange(page: number) {
    this.filterParams.page = page;
    this.fetchQuizQuestions();
  }

  getQuestionAnswerForms(): FormArray {
    return this.questionForm.controls['answers'] as FormArray;
  }

  get formControl() {
    return this.form.controls;
  }
  get questionFormControl() {
    return this.questionForm.controls;
  }
  get questionAnswers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }
  getAnswerForm(): FormGroup {
    return this.fb.group({
      content: ['', Validators.required],
      correct: [false],
    });
  }
  addAnswer() {
    (<FormArray>this.questionForm.controls['answers']).push(
      this.getAnswerForm(),
    );
  }
  private fetchQuizQuestions() {
    if (this.editQuizInstance !== null) {
      this.quizService
        .getQuestions(this.editQuizInstance.id, {
          ...this.filterParams,
          search: this.filterParams.filterText,
        })
        .subscribe((data) => {
          this.editQuizInstance!.questions = data.results;
          this.editQuizInstance!.questions_count = data.count;
        });
    }
  }
  public onQuizSave() {
    if (this.form.valid) {
      const data = this.form.value;
      const quiz_document_ids = data.document.map((item: any) => item.id);
      if (quiz_document_ids.length > 0) {
        data.document_id = quiz_document_ids[0];
      }
      if (this.editQuizInstance === null) {
        this.quizService.createQuiz(data).subscribe({
          next: (quiz_data) => {
            this.editQuizInstance = quiz_data;
            this.validationErrors = {};
          },
          error: (error) => {
            if (error.status == 400 || error.status == 422) {
              const errors = { ...error.error };
              this.validationErrors = errors;
            }
          },
        });
      } else {
        this.quizService.updateQuiz(this.editQuizInstance.id, data).subscribe({
          next: (quiz_data) => {
            this.editQuizInstance = quiz_data;
            this.fetchQuizQuestions();
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
  public onQuestionSave() {
    if (this.editQuizInstance !== null && (this.questionForm.valid || true)) {
      const data = this.questionForm.value;
      for (let index = 0; index < data.answers.length; index++) {
        data.answers[index].correct = Boolean(data.answers[index].correct);
      }
      if (this.editQuestionInstance !== null && this.editQuestionInstance.id) {
        this.quizService
          .updateQuestion(
            this.editQuizInstance.id,
            this.editQuestionInstance.id,
            data,
          )
          .subscribe((question_data) => {
            this.fetchQuizQuestions();
            this.questionForm.reset();
          });
      } else {
        this.quizService
          .addQuestion(this.editQuizInstance.id, data)
          .subscribe((question_data) => {
            this.fetchQuizQuestions();
            this.questionForm.reset();
          });
      }
    }
  }

  public onNewQuestionClick() {
    this.questionForm.reset();
    this.editQuestionInstance = null;
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
