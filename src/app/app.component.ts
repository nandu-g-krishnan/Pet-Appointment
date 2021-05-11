import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTimes, fas,faPlus } from '@fortawesome/free-solid-svg-icons';
import { without, findIndex } from 'lodash';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  orderBy: string;
  orderType: string;
  modifiedList: object[];
  theList: object[];
  lastIndex: number;

  deleteApt(theApt: object) {
    this.theList = without(this.theList, theApt);
    this.modifiedList = without(this.modifiedList, theApt);
  }

  addApt(theApt: any) {
    theApt.aptId = this.lastIndex;
    this.theList.unshift(theApt) ;
    this.modifiedList.unshift(theApt) ;
    this.lastIndex++;
  }

  searchApt(theQuery: string) {
    this.modifiedList = this.theList.filter(eachItem => {
      return (
        eachItem['petName']
          .toLowerCase()
          .includes(theQuery.toLowerCase()) ||
        eachItem['ownerName']
          .toLowerCase()
          .includes(theQuery.toLowerCase()) ||
        eachItem['aptNotes']
          .toLowerCase()
          .includes(theQuery.toLowerCase())
      );
    });
    this.sortItems();
  }

  sortItems() {

    let order: number;
      if(this.orderType === 'asc') {
        order = 1;
      }
      else {
        order = -1;
      }

    this.modifiedList.sort((a,b) => {
      if(a[this.orderBy].toLowerCase() < b[this.orderBy].toLowerCase()) {
        return -1 * order;
      }
      if(a[this.orderBy].toLowerCase() > b[this.orderBy].toLowerCase()) {
        return 1 * order;
      }
    });

  }

  orderApt(orderObj) {
    this.orderBy = orderObj.orderBy;
    this.orderType = orderObj.orderType;

    this.sortItems();
  }

  updateApt(aptInfo) {
    let aptIndex: number;
    let modifiedIndex: number;

    aptIndex = findIndex(this.theList, {aptId: aptInfo.theApt.aptId});
    modifiedIndex = findIndex(this.modifiedList, {aptId: aptInfo.theApt.aptId});

    this.theList[aptIndex][aptInfo.labelName] =  aptInfo.newValue;
    this.modifiedList[modifiedIndex][aptInfo.labelName] =  aptInfo.newValue;

  }

  constructor(private https: HttpClient,library: FaIconLibrary) {
    library.addIcons(faTimes, faPlus);
    this.orderBy = 'petName';
    this.orderType = 'asc'}

  ngOnInit() {
    this.lastIndex = 0;
    this.https.get<Object[]>('../assets/data.json').subscribe( data => {
      this.theList = data.map((item:any) => {
        item.aptId = this.lastIndex++;
        return item;
      });

      this.modifiedList = data;
      this.sortItems();
    });
  }

}
