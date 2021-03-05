import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent implements OnInit {

  constructor(private postService: PostService, private sanitizer: DomSanitizer) { }
  postList = [];
  ngOnInit(): void {
    this.postList = this.postService.getPostsList()
    this.postList.forEach((post) => {
      this.sanitizer.bypassSecurityTrustResourceUrl(post.image);
      }
    );
    console.log(this.postList);
  }

}
