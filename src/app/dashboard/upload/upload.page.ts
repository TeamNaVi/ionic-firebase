import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DashboardPage } from '../dashboard.page';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToDashboardPage() {
    this.navCtrl.navigateBack('/dashboard');
  }
}
