import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/service/categories.service';
import { PostService } from 'src/app/service/post.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permalink: string = '';
  imgSrc: any = 'https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png'
  selectedImage: any;
  categories!: Array<any>
  postForm!:FormGroup;
  post!: any;
  formStatus!: string;
  docId!: string;

  constructor(private categoryService: CategoriesService,
    private route: ActivatedRoute,
              private fb: FormBuilder,
               private postService: PostService) { 
    
                this.route.queryParams.subscribe(vap => {
                console.log(vap);
                this.docId = vap.id

                if(this.docId) {

                  this.postService.loadOneData(vap.id).subscribe(post => {
                    console.log(post);
                    this.post = post;
                    this.postForm = this.fb.group({
                      title:[this.post.title, [Validators.required, Validators.minLength(10)]],
                      permalink:[this.post.permalink,Validators.required],
                      excerpt:[this.post.excerpt, [Validators.required,Validators.minLength(15)]],
                      category:[`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
                      postImg:['',Validators.required],
                      content:[this.post.content, Validators.required]
                    })

                    this.imgSrc = this.post.postImgPath;
                    this.formStatus = 'Edit';
                    })


                }else{
                  this.postForm = this.fb.group({
                    title:['', [Validators.required, Validators.minLength(10)]],
                    permalink:['',Validators.required],
                    excerpt:['', [Validators.required,Validators.minLength(15)]],
                    category:['', Validators.required],
                    postImg:['',Validators.required],
                    content:['', Validators.required]
                  })

                }


                 
                 
                })

                


              
   
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
      // console.log(this.categories);
    })
  }

  get fc(){
   return this.postForm.controls
  }

  onTitleChange($event: any){

    const title = $event.target.value
   this.permalink =  title.replace(/\s/g,'-')
    
  }

  showPreview($event:any){
    const reader = new FileReader()
    reader.onload = (e) =>{
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target?.files[0])
    this.selectedImage = $event.target.files[0];
  }

  onSubmit(){
    console.log(this.postForm.value);
   let splited =  this.postForm.value.category.split('-');
   console.log(splited);
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splited[0],
        category: splited[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    console.log(postData);
    this.postService.uploadImages(this.selectedImage, postData,this.formStatus,this.docId);
    this.postForm.reset();
    this.imgSrc ='https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png';
  }

}
