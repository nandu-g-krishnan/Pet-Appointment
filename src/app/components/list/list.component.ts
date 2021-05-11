import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() aptList;
  @Output() deleteEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();

  handleDelete(theApt: object) {
    this.deleteEvent.emit(theApt);
  }

  handleUpdate(theApt: object, labelName: string, newValue: string) {
    this.updateEvent.emit({
      theApt: theApt,
      labelName: labelName,
      newValue: newValue
    });
  }


  constructor() { }

  ngOnInit() {
  }

}
