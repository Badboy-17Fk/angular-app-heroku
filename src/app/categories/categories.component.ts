import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './../service/categories.service';
import { Category } from '../models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray!: Array<any>; 
  formCategory!: string;
  formStatus: string = 'Add';
  categoryid!: string;
  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    
    // this.categoryService.getData().subscribe(val => {
    //   console.log(val)
    //  this.categoryArray =  val
      
      
    // })
    this.categoryService.loadData().subscribe(val => {
       console.log(val)
       this.categoryArray = val;
      })
    
    
    
  }
 

  onSubmit(formData:any){
    
    let categoryData: Category = {
      category: formData.value.category
    } 
    if(this.formStatus == 'Add'){

      this.categoryService.saveData(categoryData);
      formData.reset()
    }
    else if (this.formStatus =='Edit') {
      this.categoryService.updateData(this.categoryid,categoryData)
      formData.reset();
      this.formStatus = 'Add';
    }
   
   
  }
  onEdit(category:any, id:any){
    // console.log(category);
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryid = id;
  }

  onDelete(id:any){
    this.categoryService.deleteData(id);
  }


}
