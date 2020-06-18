import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MenuListModel } from 'src/app/models/menu-list';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: '[app-menu-list]',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  @Input() model: MenuListModel;
  @Output() itemClick = new EventEmitter();

  currentItemId: string = "all";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.model.pathVariable) {
      // this.currentItemId = this.route.snapshot.params[this.model.paramName];
      // this.route.params.subscribe(params => {
      //   console.log(params);
      //   const itm = params[this.model.paramName];
      //   console.log(itm);
      //   if (itm) {
      //     this.currentItemId = itm;
      //   }
      // });
    } else {
      this.route.queryParams.subscribe(queryParams => {
        const itm = queryParams[this.model.paramName];
        if (itm) {
          this.currentItemId = itm;
        }
      });
    }
  }

  onItemClicked(itemId) {
    this.itemClick.emit(itemId);
  }
}
