import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../food-item';
import { MOCKFOODLIST} from '../mock-food-list'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-granary',
  templateUrl: './granary.component.html',
  styleUrls: ['./granary.component.css']
})
export class GranaryComponent implements OnInit {
  new_food_name = "";
  food_item_list: FoodItem[];

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.food_item_list = MOCKFOODLIST;
  }
  
  onClickDelete(){
    this.food_item_list.pop();
  }

  onClickAdd(){
    let x = {name: this.new_food_name, is_perishable: true, have_or_not_bool: false};
    this.food_item_list.push(x);
    this.new_food_name = "peas2";
    this.onCreate();
  }

  onCreate(){
    //this.http.post('http://localhost:3000/articles', this.myForm.getRawValue())

    this.http.post('http://localhost:3000/granary', {name:this.new_food_name, quantity:2})
             .subscribe(res => {
               console.log('returned');
               console.log(res);
             });
  }

}
