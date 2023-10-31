import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-debounced-search-input',
  templateUrl: './debounced-search-input.component.html',
  styleUrls: ['./debounced-search-input.component.scss']
})
export class DebouncedSearchInputComponent implements OnInit {

    @Input() initialValue: string = '';
    @Input() debounceTime = 300;
  
    @Output() textChange = new EventEmitter<string>();
  
    inputValue = new Subject<string>();
    trigger = this.inputValue.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
  
    subscriptions: Subscription[] = [];
  
    constructor() {
    }
  
    ngOnInit() {
      const subscription = this.trigger.subscribe(currentValue => {
        this.textChange.emit(currentValue);
      });
      this.subscriptions.push(subscription);
    }
  
    ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  
    onInput(e: any) {
      this.inputValue.next(e.target.value);
    }
  }