
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mycontact } from 'src/app/mycontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-updatecontact',
  templateUrl: './updatecontact.component.html',
  styleUrls: ['./updatecontact.component.css'],
})
export class UpdatecontactComponent implements OnInit {
  loading: boolean = false;
  errormassage: string | null = null;
  contact: Mycontact = {} as Mycontact;
  contactid: string | null = null;
  constructor(
    private contservice: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.contactid = params.get('contactid');
    });

    if (this.contactid) {
      this.contservice.getsinglecontact(Number(this.contactid)).subscribe(
        (data: any) => {
          this.loading = true;
          this.contact = data;
          this.loading = false;
        },
        (error) => {
          this.errormassage = error;
          this.loading = false;
        }
      );
    }
  }

  updatecontact() {
    if (this.contactid) {
      this.contservice.updatecontact(this.contact, Number(this.contactid)).subscribe((res)=>{
          this.router.navigate(['contacts/admin']);
      });
    }
  }
}
