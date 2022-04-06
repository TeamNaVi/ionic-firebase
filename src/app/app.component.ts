import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { FirebaseStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private DataBase: AngularFirestore;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(db: AngularFirestore) {
    // 모듈에서 만들어진 파이어 베이스 접속관련 객체
    this.DataBase = db;
    this.getItem('board').subscribe((res) => {
      // board 컬렉션에 대해서 구독행위 시작
      console.log(res);
    });
  }

  getItem(db_name: string) {
    this.itemsCollection = this.DataBase.collection<any>(db_name, (ref) => ref); // 컬렉션에 접속
    return this.itemsCollection.valueChanges(); // 리턴
  }
}
