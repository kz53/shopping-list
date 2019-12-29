import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextBoxComponent } from './text-box/text-box.component'
import { GranaryComponent } from './granary/granary.component'
const routes: Routes = [
  // { path: '', component: GranaryComponent },
  { path: 'textbox', component: TextBoxComponent },
  { path: 'granary', component: GranaryComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
