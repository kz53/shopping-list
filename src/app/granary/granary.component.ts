import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../food-item';
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

  wishListSet = new Set();
  wishListArray = [];
  wishListTextBox = "";

  deepFreezeSet = new Set();
  deepFreezeArray = new Set();
  showDeepFreeze = false;
  
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.onIndex();
  }

  onIndex(){
    this.http.get<any[]>('http://localhost:3000/granary/')
    .subscribe(res => {
       console.log(res);
       console.log(typeof(res));
       // this.food_item_list = res;
       res.forEach(x => {
         if (x.wanted == true ) {
           this.wishListSet.add(x.name);
           this.wishListArray.push(x.name); 
           console.log(this.wishListArray);
         }
         if (x.quantity > 0) {
           this.foodNameSet.add(x.name);
           this.foodNameArray.push(x.name); 
           console.log(this.foodNameArray);
         }
         if (x.long_term == true ) {
           this.deepFreezeSet.add(x.name);
         }
       });
    });
  }

  onClickAdd(){
    if(!this.foodNameSet.has(this.foodTextBox) && this.foodTextBox != ""){
      this.updateFoodItemQuantity(this.foodTextBox, 1);
    }
    else {
      console.log("already in there");
    }
    this.foodTextBox = "";
  }

  onClickDelete(){
    if(this.foodTextBox == ""){
      this.updateFoodItemQuantity(this.foodNameArray[0], 0);
    }
    else if(this.foodNameSet.has(this.foodTextBox)){
      this.updateFoodItemQuantity(this.foodTextBox, 0);
      console.log("removed ");
    }
    else {
      console.log("not in there buddy");
    }
    this.foodTextBox = "";
  } 

  onClickWishListAdd(){
    if(!this.wishListSet.has(this.wishListTextBox) && this.wishListTextBox != ""){
      this.updateFoodItemWanted(this.wishListTextBox, true);
    } 
    else {
      console.log("already in there");
    }
    this.wishListTextBox = "";
  }

  onClickWishListDelete(){
    if(this.foodTextBox == ""){
      this.updateFoodItemWanted(this.wishListArray[0], false);
    }
    else if(this.wishListSet.has(this.wishListTextBox)){
      this.updateFoodItemWanted(this.wishListTextBox, false);
      console.log("removed ");
    }
    else {
      console.log("not in there buddy");
    }
    this.wishListTextBox = "";
  }

  updateFoodItemQuantity(foodName: string, quantity: number){
    this.http.put(`http://localhost:3000/granary/${foodName}`, {name: foodName, quantity: quantity})
    .subscribe(res => {
      console.log('returned');
      console.log(res);
      if (quantity >= 1 ) {
        this.addFoodItemToDisplay(foodName);
      } else {
        this.deleteFoodItemFromDisplay(foodName);
      }
      
    });
  }

  updateFoodItemWanted(foodName: string, wanted: boolean){
    this.http.put(`http://localhost:3000/granary/${foodName}`, {name: foodName, wanted: wanted})
    .subscribe(res => {
      console.log('returned');
      console.log(res);
      if(wanted){
        this.addFoodItemToWishList(foodName);
      } else {
        this.deleteFoodItemFromWishList(foodName);
      }
      
    });
  }

  updateFoodItemDeepFreeze(foodName: string, deepFreeze: boolean){
    this.http.put(`http://localhost:3000/granary/${foodName}`, {name: foodName, long_term: deepFreeze})
    .subscribe(res => {
      console.log('returned');
      console.log(res);
      if(deepFreeze){
        this.moveToDeepFreeze(foodName);
      } else {
        this.removeFromDeepFreeze(foodName);
      }
      
    });
  }

  moveToDeepFreeze(foodName: string){
    if(!this.deepFreezeSet.has(foodName)){
      this.deepFreezeSet.add(foodName); 
    }
  }

  removeFromDeepFreeze(foodName: string){
    if(this.deepFreezeSet.has(foodName)){
      this.deepFreezeSet.delete(foodName); 
    }
  }

  addFoodItemToDisplay(foodName: string){
    if(!this.foodNameSet.has(foodName)){
      this.foodNameSet.add(foodName);
      this.foodNameArray.unshift(foodName); 
    }
  }

  deleteFoodItemFromDisplay(foodName: string){
    if(this.foodNameSet.has(foodName)){
      this.foodNameSet.delete(foodName);
      let foodNamePos = this.foodNameArray.indexOf(foodName);
      console.log(foodNamePos);
      this.foodNameArray.splice(foodNamePos, 1);
    }
  }

  addFoodItemToWishList(foodName: string){
    if(!this.wishListSet.has(foodName)){
      this.wishListSet.add(foodName);
      this.wishListArray.unshift(foodName); 
    }
  }

  deleteFoodItemFromWishList(foodName: string){
    if(this.wishListSet.has(foodName)){
      this.wishListSet.delete(foodName);
      let foodNamePos = this.wishListArray.indexOf(foodName);
      console.log(foodNamePos);
      this.wishListArray.splice(foodNamePos, 1);
    }
  }

  // addFoodItemToDatabase(foodName: string, quantity: number, wanted: boolean){
  //   //this.http.post('http://localhost:3000/articles', this.myForm.getRawValue())
  //   let newFoodItem = new FoodItem();
  //   newFoodItem.isPerishable = true;
  //   newFoodItem.have = true;
  //   newFoodItem.name = foodName; 
  //   this.http.put('http://localhost:3000/granary', {name: newFoodItem.name, quantity: quantity, wanted: wanted})
  //            .subscribe(res => {
  //              console.log('returned');
  //              console.log(res);
  //              if (wanted){
  //                this.addFoodItemToWishList(foodName);
  //              } else {
  //                this.addFoodItemToDisplay(foodName);
  //              }
  //            });
  // }

  // deleteFoodItemFromDatabase(foodName: string){
  //   //this.http.post('http://localhost:3000/articles', this.myForm.getRawValue())
  //   this.http.delete(`http://localhost:3000/granary/${foodName}`)
  //            .subscribe(res => {
  //              console.log(res);
  //              this.deleteFoodItemFromDisplay(foodName);
  //            });
  // } 

}
