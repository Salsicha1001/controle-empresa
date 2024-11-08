import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './load.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css'],
})
export class LoadComponent {
  spinner$: any;
  constructor(private load: SpinnerService) {}
  ngOnInit() {
    this.load.loading$.subscribe((res) => (this.spinner$ = res));
  }
}
