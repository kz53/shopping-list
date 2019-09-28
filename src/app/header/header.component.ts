import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideMenu: boolean = true;
  menuClass: string = "menu-hide";
  constructor() { }


  ngOnInit() {
  }

  toggleHamburger() {
    if (this.menuClass == "menu-hide"){
      this.menuClass = "menu-show";
    } else{
      this.menuClass = "menu-hide";
    }
}

}
