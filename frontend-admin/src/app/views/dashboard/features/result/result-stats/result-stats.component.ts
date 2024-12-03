import { Component, ViewChild } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { Student } from '../../student/student';
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-result-stats',
  templateUrl: './result-stats.component.html',
  styleUrls: ['./result-stats.component.scss'],
})
export class ResultStatsComponent extends BaseEditComponent {
  public x_time = [];
  public chartLineOptions = {
    maintainAspectRatio: false,
  };
  public chartLineData = {
    labels: [...this.x_time].slice(0, 7),
    datasets: [
      {
        label: 'Practical Score',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(220, 220, 220, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: '#fff',
        data: [],
      },
      {
        label: 'Theory Score',
        backgroundColor: 'rgba(151, 187, 205, 0.2)',
        borderColor: 'rgba(151, 187, 205, 1)',
        pointBackgroundColor: 'rgba(151, 187, 205, 1)',
        pointBorderColor: '#fff',
        data: [],
      },
      {
        label: 'Total Score',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(0, 0, 0, 1)',
        pointBackgroundColor: 'rgba(255, 0, 0, 1)',
        pointBorderColor: '#fff',
        data: [],
      },
    ],
  };
  @ViewChild('lineChart') lineChart!: ChartjsComponent;
  public update_chart_data(initital_data?: any[]) {
    const x_time: string[] = [];
    const datasets: any = {
      practical_score: [],
      theory_score: [],
      total_score: [],
    };
    if (initital_data !== undefined) {
      for (let index = 0; index < initital_data.length; index++) {
        const element = initital_data[index];
        x_time.push(element.date);
        datasets.practical_score.push(element.practical_score);
        datasets.theory_score.push(element.theory_score);
        datasets.total_score.push(element.total_score);
      }
    }
    (this.chartLineData.labels as any) = x_time;
    this.chartLineData.datasets[0].data = datasets.practical_score;
    this.chartLineData.datasets[1].data = datasets.theory_score;
    this.chartLineData.datasets[2].data = datasets.total_score;
    this.lineChart.chartUpdate();
  }

  public override action_urls = {
    detail: (id?: number) =>
      id === undefined
        ? `/api/s/results/stats/`
        : `/api/s/results/stats/?student_id=${id}`,
  };
  public override editInstance: Student | null = null;

  override ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    this.fetchInstance(initialState.id);
  }

  protected override fetchInstance(id?: number) {
    const item_id = this.editInstance !== null ? this.editInstance.id : id!;
    this.loading.list = true;
    return this.fetchInstanceRequest(item_id).subscribe({
      next: (data: any) => {
        this.loading.list = false;
        if (data.current_student) {
          this.editInstance = data.current_student;
        }
        this.update_chart_data(data.chart_data?.results_data);
      },
    });
  }
}
