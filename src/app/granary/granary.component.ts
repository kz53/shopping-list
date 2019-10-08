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
  foodNameSet = new Set();
  foodNameArray = [];
  foodTextBox = "";


  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.onIndex();
    // let x = {name: this.new_food_name, is_perishable: true, have_or_not_bool: false};
    // this.food_item_list.push(x);
    
    // this.onCreate();

  }

  onClickDelete(){
    // this.food_item_list.pop();
    // this.food_set.delete()
    if(this.foodNameSet.has(this.foodTextBox)){
      this.deleteFoodItemFromDatabase(this.foodTextBox);
      console.log("removed ");
    }
    else {
      console.log("not in there buddy");
    }
    this.foodTextBox = "";
  } 

  onClickAdd(){
    if(!this.foodNameSet.has(this.foodTextBox) && this.foodTextBox != ""){
      this.addFoodItemToDatabase(this.foodTextBox);
    }
    else {
      console.log("already in there");
    }
    this.foodTextBox = "";
  }

  addFoodItemToDatabase(foodName: string){
    //this.http.post('http://localhost:3000/articles', this.myForm.getRawValue())
    let newFoodItem = new FoodItem();
    newFoodItem.isPerishable = true;
    newFoodItem.have = true;
    newFoodItem.name = foodName; 
    this.http.post('http://localhost:3000/granary', {name: newFoodItem.name, quantity: 1})
             .subscribe(res => {
               console.log('returned');
               console.log(res);
               this.addFoodItemToDisplay(foodName);
             });
  }

  deleteFoodItemFromDatabase(foodName: string){
    //this.http.post('http://localhost:3000/articles', this.myForm.getRawValue())
    this.http.delete(`http://localhost:3000/granary/${foodName}`)
             .subscribe(res => {
               console.log(res);
               this.deleteFoodItemFromDisplay(foodName);
             });
  } 
 


  addFoodItemToDisplay(foodName: string){
    if(!this.foodNameSet.has(foodName)){
      this.foodNameSet.add(foodName);
      this.foodNameArray.push(foodName); 
    }
  }

  deleteFoodItemFromDisplay(foodName: string){
    console.log("removing bot");
    if(this.foodNameSet.has(foodName)){
      console.log("removing bot 2");
      this.foodNameSet.delete(foodName);
      let foodNamePos = this.foodNameArray.indexOf(foodName);
      console.log(foodNamePos);
      this.foodNameArray.splice(foodNamePos, 1);
    }
  }

  onIndex(){
    this.http.get('http://localhost:3000/granary/')
             .subscribe(res => {
               console.log(res);
               console.log(typeof(res));
               // this.food_item_list = res;
               res.forEach(x => {
                 this.foodNameSet.add(x.name);
                 
                 this.foodNameArray.push(x.name); 
                 console.log(this.foodNameArray);
               }
               );
             });
  }

}
