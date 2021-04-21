import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { DocumentsService } from '../../services/documents.service';
import { DocumentN } from '../../models/document_N';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  resultsLengthAddTable = 0;

  currentUser: User;
  role: string;
  users: User[];
  product: Product;

  documentN: DocumentN = new DocumentN();

  selectedTab: number;
  addNewDoc = false;
  manageDoc = false;
  newDocDate: string;
  kindOfDocument: string;

  specialProducts = [];
  documentPId = [];
  idN: number;


  constructor(
    private auth: AuthenticationService,
    private userService: UsersService,
    private productService: ProductsService,
    private documentsService: DocumentsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.getUser();
  }

  ngOnInit() {

  }

  getUser(): void {
    this.auth.getUser().subscribe(user => {
      this.currentUser = user;
      this.role = user.uprawnienie;
      this.documentN.uzytkownik_id = user.id;
    },
      error => {
        console.log(error);
        if (error) {
          this.auth.logout();
        }
    });
  }

  getProductsLength(): void {
    this.productService.getProductsLength().subscribe(total => this.resultsLengthAddTable = total);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  getRoute(type: string): void {
    if (this.role === 'root' || this.role === 'admin') {
      this.router.navigate(['./add-new', type], { relativeTo: this.route });
    } else {
        this.documentsService.checkAccessOnCreateNew(type, this.currentUser.id).subscribe(access => {

          if (access) {
            this.router.navigate(['./add-new', type], { relativeTo: this.route });
          } else {
            this.router.navigate(['./look', type], { relativeTo: this.route });
          }
        });

    }
  }

  logout(): void {
    this.auth.logout();
  }

}


