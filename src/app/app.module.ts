import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { SearchComponent } from './components/search/search.component';
import { AppRoutingModule } from './app-routing.module';

import { GitService } from './services/git.service';

import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { MessageComponent } from './components/message/message.component';
import { MessageService } from './services/message.service';







@NgModule({
  declarations: [
    AppComponent,
    RepositoryComponent,
    SearchComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatProgressBarModule,
    VerticalTimelineModule
  ],
  providers: [ GitService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
