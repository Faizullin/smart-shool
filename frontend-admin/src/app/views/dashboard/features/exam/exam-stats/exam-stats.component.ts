import { Component, ViewChild } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { Exam } from '../exam';
import { Result } from '../../result/result';

@Component({
  selector: 'app-exam-stats',
  templateUrl: './exam-stats.component.html',
  styleUrls: ['./exam-stats.component.scss'],
})
export class ExamStatsComponent extends BaseEditComponent {
  public table_data: Result[] = [];
  public attendanceChartOptions = {
    maintainAspectRatio: false,
  };
  public attendanceChartData = {
    labels: ['Absent', 'Passed', 'Failed to pass'],
    datasets: [
      {
        backgroundColor: ['#808080', '#00D8FF', '#E46651'],
        data: [0, 0, 0],
      },
    ],
  };

  public unavailable_data: boolean = false;
  @ViewChild('attendanceChart') attendanceChart!: ChartjsComponent;
  public update_chart_data(initital_data?: any) {
    const datasets: any = {
      absent_count: initital_data?.absent_count || 0,
      passed_count: initital_data?.passed_count || 0,
      failed_count: initital_data?.failed_count || 0,
    };
    this.attendanceChartData.datasets[0].data = [
      datasets.absent_count,
      datasets.passed_count,
      datasets.failed_count,
    ];
    this.unavailable_data =
      datasets.passed_count === 0 &&
      datasets.failed_count === 0 &&
      datasets.passed_count === 0;
    this.attendanceChart.chartUpdate();
  }

  public override action_urls = {
    detail: (id: number) => `/api/s/exams/stats/?exam_id=${id}`,
  };
  public override editInstance: Exam | null = null;

  protected override fetchInstance(id?: number) {
    const item_id = this.editInstance !== null ? this.editInstance.id : id!;
    this.loading.list = true;
    return this.fetchInstanceRequest(item_id).subscribe({
      next: (data: any) => {
        this.loading.list = false;
        this.update_chart_data(data.chart_data?.attendance_data);
        if (data.table_data) {
          this.table_data = data.table_data;
        }
      },
    });
  }
}
