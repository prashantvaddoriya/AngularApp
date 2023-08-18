import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  data: any = [];
  companyData : any = [];
  constructor(private contsservice: ContactService) { }


  ngOnInit(): void {
    this.contsservice.getHobbyStatistics().subscribe(
      response => {
        // Convert the response object to an array of key-value pairs
        this.data = Object.entries(response);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.contsservice.getHobbyStatistics().subscribe(
      response => {
        // Convert the response object to an array of key-value pairs
        this.companyData = Object.entries(response);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
