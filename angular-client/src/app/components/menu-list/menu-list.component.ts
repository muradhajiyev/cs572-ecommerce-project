import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MenuListModel } from 'src/app/models/menu-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: '[app-menu-list]',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit{
  @Input() model: MenuListModel;
  @Output() itemClick = new EventEmitter();

  currentItemId: string = "all";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      const itm = queryParams["cat"];
      if (itm) {
        this.currentItemId = itm;
      }
    });
  }

  onItemClicked(itemId){
    this.itemClick.emit(itemId);
  }
}
