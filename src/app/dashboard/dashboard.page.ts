// dashboard.page.ts
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userEmail: string;

  @ViewChild('video', { static: false }) videoElement: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  // 영상의 크기(해상도)를 측정하기 위한 객체
  videoBoundingRect;

  videoWidth: number = 0;
  videoHeight: number = 0;

  // option
  constraints = {
    // 모바일 environment: 후면 / user: 전면 카메라
    video: {
      facingMode: 'environment',
    },
  };

  showVideo: boolean = true;
  svgEnabled: boolean = true; // bounding box를 위한 svg, 그것을 보여주냐 마느냐
  doSpinner: boolean = false; // 외부 api call을 보여주냐 마느냐

  apiUrl = 'http://localhost:8100/';

  // 의존성 주입(dependency injection) : Renderer2의 모든 기능들을 HttpClient에서 변수,함수처럼 사용가능하게 함
  constructor(
    private renderer: Renderer2,
    // private http: HttpClient,

    private navCtrl: NavController,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.startCamera(); // 카메라 사용
    this.authService.userDetails().subscribe(
      (res) => {
        console.log('res', res);
        if (res !== null) {
          this.userEmail = res.email;
        } else {
          this.navCtrl.navigateBack('');
        }
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  logout() {
    this.authService
      .logoutUser()
      .then((res) => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 카메라 사용 / 브라우저에서 지원하는 navigator 객체사용 -> 카메라 사용 가능
  // 'async' startCamera() : 비동기방식 - 실행될 때 까지 기다림
  async startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.handleError);
      this.showVideo = true;
      // this.svgEnabled = false;
    } else {
      alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(
      this.videoElement.nativeElement,
      'srcObject',
      stream
    );
    // listen : 계속 플레이
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }
  handleError(error) {
    console.log('Error: ', error);
    alert('Error: ' + error);
  }

  // video태그의 nativeElement의 getBoundingClientRect() -> 영상의 바운더리? 를 가져오는 역할
  // 바운더리를 가져와서 어쩔거냐? -> 영상 가져와서 그 위에 box를 쳐주는 방식에 사용 -> svg태그
  async onVideoCanPlay() {
    this.videoBoundingRect =
      this.videoElement.nativeElement.getBoundingClientRect();
  }
}
