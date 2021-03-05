import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CyberArkProject';

  links = [
    {
      title: 'feed',
      urlLink: '/feed',
      buttonTxt: 'Feed'
    },
    {
      title: 'create',
      urlLink: '/create',
      buttonTxt: 'New'
    }
  ];
  constructor(public router: Router){}
}
