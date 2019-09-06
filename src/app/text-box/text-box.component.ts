import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../food-item';
import { MOCKFOODLIST} from '../mock-food-list'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {
  new_food_name = "";
  food_item_list: FoodItem[];
  rand_data: string;

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.food_item_list = MOCKFOODLIST;
  }

  onClickDelete(){
    this.food_item_list.pop();
  }

  onClickAdd(){
    let x = {name: this.new_food_name, is_perishable: true, have_or_not_bool: false};
    this.food_item_list.push(x);
    this.new_food_name = "";
  }


  onIndex(){
    this.http.get('http://localhost:3000/articles/')
             .subscribe(res => {
               console.log(res);
             });
  }

  onShow(){
    this.http.get('http://localhost:3000/articles/3')
             .subscribe(res => {
               console.log(res);
             });
  }

  onEdit(){
    this.http.get('http://localhost:3000/articles/')
             .subscribe(res => {
               console.log(res);
             });
  }

  onNew(){
    this.http.get('http://localhost:3000/articles/')
             .subscribe(res => {
               console.log(res);
             });
  }

  onCreate(){
    this.http.get('http://localhost:3000/articles/')
             .subscribe(res => {
               console.log(res);
             });
  }

  onUpdate(){
    this.http.get('http://localhost:3000/articles/')
             .subscribe(res => {
               console.log(res);
             });
  }

  onDestroy(){
    this.http.get('http://localhost:3000/articles/')
             .subscribe(res => {
               console.log(res);
             });
  }

}
