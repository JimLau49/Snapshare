import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})


export class PostComponent {
  
  @Input() post: any;
  // getImageSource() {
  //   return `data:image/jpeg;base64,${this.post.image.toString('base64')}`;
  // }
}
