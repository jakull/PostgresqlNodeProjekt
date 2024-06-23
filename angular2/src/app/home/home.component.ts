import { Component,OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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
