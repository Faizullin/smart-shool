import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { Result } from './features/result/result';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Router } from '@angular/router';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private chartsData: DashboardChartsData,
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private router: Router,
  ) {}
  @ViewChild('diskStatsChart') diskStatsChart!: ElementRef;
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month'),
  });

  ngOnInit(): void {
    this.initCharts();
    this.fetchUncheckedResults();
    this.fetchDiskSpace();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  public results_data: Result[] = [];
  private fetchUncheckedResults() {
    return this.http
      .get<any>(`/api/s/results/`, {
        params: {
          checked: false,
          attendance: true,
          page_size: 10,
          ordering: '-updated_at',
        },
      })
      .pipe(
        map((data: any) => {
          const results_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: results_data.map(function (resultes: any): Result {
              return {
                ...resultes,
              } as Result;
            }),
            count: total_items,
          };
        }),
      )
      .subscribe({
        next: (results_data) => {
          this.results_data = results_data.results;
        },
      });
  }
  public fetchDiskSpace() {
    return this.http
      .get<any>(`/api/s/disk_stats/`)
      .pipe(
        map((data: any) => {
          return {
            ...data,
          };
        }),
      )
      .subscribe({
        next: (chartDiskData) => {
          this.chartDiskData.datasets[0].data[0] = this.getConvertedDiskData(
            chartDiskData.used_space,
          );
          this.chartDiskData.datasets[0].data[1] = this.getConvertedDiskData(
            chartDiskData.free_space,
          );
          (this.diskStatsChart as any).chart.update();
        },
      });
  }
  private getConvertedDiskData(data_raw: number) {
    return Number((data_raw / Math.pow(1024, 3)).toFixed(1));
  }
  public onOpenClick(event: any) {
    event.preventDefault();
    this.sharedDataService.setFilterData({
      checked: false,
      attendance: true,
    });
    this.router.navigate(['dashboard', 'results', 'list']);
  }
  public chartDiskData = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };
}
