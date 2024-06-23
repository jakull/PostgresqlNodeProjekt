import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().then((response: any) => {
      this.data = response;
      console.log("DATAAAA",this.data)
    }).catch((error) => {
      console.error('There was an error!', error);
    });
  }}