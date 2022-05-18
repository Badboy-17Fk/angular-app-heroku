import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  postArray!: Array<any>;

  constructor(private postService:PostService) { }

  ngOnInit(): void {

    this.postService.loadData().subscribe(val => {
      console.log(val);
      this.postArray = val;
    })
  }


  onDelete(imagePath: any, id:any){

    this.postService.deleteImage(imagePath, id)
  }

  onFeatured(id: any, value: any){
    const featuredData = {
      isFeatured: value
    }
    this.postService.updateIsFeatured(id,featuredData);
  }

 

}
