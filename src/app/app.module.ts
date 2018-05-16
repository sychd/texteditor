import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FileComponent } from './file/file.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { HeaderComponent } from './header/header.component';
import { TextService } from './text-service/text.service';
import { SynonymPanelComponent } from './synonym-panel/synonym-panel.component';
import {SynonymPanelService} from './synonym-panel/synonym-panel.service';

@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
    ControlPanelComponent,
    HeaderComponent,
    SynonymPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TextService, SynonymPanelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
