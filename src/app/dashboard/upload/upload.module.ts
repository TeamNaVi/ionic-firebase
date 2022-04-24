import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPageRoutingModule } from './upload-routing.module';

import {AngularFirestore} from '@angular/fire/compat/firestore';
import { UploadPage } from './upload.page';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../../../environments/environment';

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    UploadPageRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase), // firebase 모듈 사용
  ],
  declarations: [UploadPage],
  bootstrap: [UploadPage]
})
export class UploadPageModule {}
