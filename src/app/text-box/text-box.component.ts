import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {
  article_master_list;
  article_in_show;

  rand_data: string;
  show_article_id: number;
  edit_visible: boolean = true;
  new_visible: boolean = false;
  enable_update: boolean = false;
  enable_create: boolean = false;

  edit_article_id:number;
  edit_title: string;
  edit_text: string;
  new_title: string;
  new_text: string;

  destroy_article_id: string;

  // constructor(private http: HttpClient, private builder: FormBuilder, private group: FormGroup){}
  constructor(private http: HttpClient){}

  ngOnInit() {

  }

  onIndex(){
    this.http.get('http://localhost:3000/articles/')
             .subscribe(res => {
               console.log(res);
               console.log(typeof(res));
               this.article_master_list = res;
             });
  }

  onShow(){
    this.http.get(`http://localhost:3000/articles/${this.show_article_id}`  )
             .subscribe(res => {
               console.log(res);
               console.log(typeof(res));
               this.article_in_show= res;
             });
  }

  onEdit(){
    // this.toggleEdit();
    if(this.edit_article_id != null){
      this.http.get(`http://localhost:3000/articles/${this.edit_article_id}/edit`  )
             .subscribe(res => {
               console.log(res);
               this.edit_title = res["title"];
               this.edit_text = res["text"];
             });
    }
  }

  onUpdate(){
    console.log(this.edit_title);
    console.log(this.edit_text);
    this.http.put(`http://localhost:3000/articles/${this.edit_article_id}`, {title: this.edit_title, text: this.edit_text})
             .subscribe(res => {
               console.log(res);
             });
  }

  onNew(){
    this.toggleNew();
  }

  onCreate(){
    //this.http.post('http://localhost:3000/articles', this.myForm.getRawValue())

    this.http.post('http://localhost:3000/articles', {title:this.new_title, text:this.new_text})
             .subscribe(res => {
               console.log('returned');
               console.log(res);
             });
  }



  onDestroy(){
    this.http.delete(`http://localhost:3000/articles/${this.destroy_article_id}`)
             .subscribe(res => {
               console.log(res);
             });
  }

  toggleNew(){
    this.new_visible = !this.new_visible;
  }

  toggleEdit(){
    this.edit_visible = !this.edit_visible;
  }
 
}
