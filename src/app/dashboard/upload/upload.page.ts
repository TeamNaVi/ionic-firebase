import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DashboardPage } from '../dashboard.page';

import {AngularFireStorage} from '@angular/fire/compat/storage';
import {AuthenticationService} from '../../services/authentication.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  constructor(private navCtrl: NavController, private afStorage: AngularFireStorage, private afs:  AngularFirestore) {}
  ngOnInit() {  }
  upload(event) {
    // eslint-disable-next-line max-len
    this.afStorage.upload('/learning-model-files/'+ firebase.auth().currentUser.uid +'/' + event.target.files[0].name, event.target.files[0]);
  }
  goToDashboardPage() {
    this.navCtrl.navigateBack('/dashboard');
  }
}
