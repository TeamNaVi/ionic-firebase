import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DashboardPage } from '../dashboard.page';

import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  private ref: AngularFireStorageReference;
  private task: AngularFireUploadTask;
  private uploadProgress: Observable<number | undefined>;
  constructor(
    private navCtrl: NavController,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}
  ngOnInit() {}
  upload(event) {
    const filePath =
      '/learning-model-files/' +
      firebase.auth().currentUser.uid +
      '/' +
      event.target.files[0].name;

    this.ref = this.afStorage.ref(filePath);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
  }
  goToDashboardPage() {
    this.navCtrl.navigateBack('/dashboard');
  }
}

//push test
