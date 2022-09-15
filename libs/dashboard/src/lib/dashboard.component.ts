/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  standalone: true, 
  template: `
    <p>
      dashboard works!
    </p>
  `,
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

}
