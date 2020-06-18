import { Component, OnInit } from '@angular/core';
import { MenuListModel } from 'src/app/models/menu-list';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  menuListModel: MenuListModel = new MenuListModel('Categories1', 'cat', []);

  menuListModel: MenuListModel = new MenuListModel('Categories', 'cat', []);

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      let items: Array<{ id: string; text: string }> = [];
      items.push({ id: 'all', text: 'All categories' });
      categories.result.forEach((cat) => {
        items.push({ id: cat._id.toString(), text: cat.name });
      });
      this.menuListModel = new MenuListModel('Categories2', 'cat', items);
    });
  }
}
