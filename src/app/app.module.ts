import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LyThemeModule, LY_THEME } from '@alyle/ui';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';

/** Import the component modules */
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
import { AppRoutingModule } from './app-routing.module';
import { GranaryComponent } from './granary/granary.component';
@NgModule({
  declarations: [
    AppComponent,
    TextBoxComponent,
    HeaderComponent,
    GranaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LyThemeModule.setTheme('minima-light'),
    // Add components
    LyButtonModule,
    LyToolbarModule,
    LyResizingCroppingImageModule,
    AppRoutingModule
  ],
  providers: [{ provide: LY_THEME, useClass: MinimaLight, multi: true }, { provide: LY_THEME, useClass: MinimaDark, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
