import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {  tap } from 'rxjs';
import { Mycontact } from 'src/app/mycontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contactmanager',
  templateUrl: './contactmanager.component.html',
  styleUrls: ['./contactmanager.component.css'],
})
export class ContactmanagerComponent implements OnInit {
  loading: boolean = false;
  errormassage: string | null = null;
  contacts: Mycontact[] = [];
  searchcontact: string = '';
  isAscendingSort: Boolean = true;
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;
  constructor(private contsservice: ContactService) { }

  ngOnInit(): void {
    this.getallcontactdata(this.pageSize, this.pageIndex);

  
  }
  getallcontactdata(pageSize: number,pageIndex: number) {
    this.contsservice.getallcontacts(pageSize,pageIndex).pipe(
      tap((res: any) => res)).subscribe((res) => {
        this.contacts = res;
      });
  }

  deletecontact(contectid: number) {
    debugger
    if (contectid) {
      this.contsservice.deletecontact(contectid).subscribe(
        (res: Mycontact) => this.getallcontactdata(this.pageSize, this.pageIndex));
    }
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getallcontactdata(this.pageSize, this.pageIndex);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  // Length = 6;
  // DefaultEntrie =6;
}
