import { Component, OnInit } from '@angular/core';
import { SettingsService } from './../../core/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public states = {
    showComponents: false,
    email_enabled: false,
  };

  constructor(private settingsService: SettingsService) {
    this.states.showComponents = settingsService.getShowComponentsState();
  }

  ngOnInit(): void {
    this.settingsService.getLastConfig().subscribe({
      next: (config: any) => {
        this.states.email_enabled = config.email_enabled;
      },
    });
  }

  public toggleShowComponents() {
    this.settingsService.toggleShowComponents();
  }
  public toggleEmailEnabled() {
    const new_state = this.states.email_enabled;
    this.settingsService.toggleEmailEnabled(new_state).subscribe({
      next: (config: any) => {
        this.states.email_enabled = config.email_enabled;
      },
    });
  }
}