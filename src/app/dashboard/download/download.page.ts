import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToDashboardPage() {
    this.navCtrl.navigateBack('/dashboard');
  }
}
