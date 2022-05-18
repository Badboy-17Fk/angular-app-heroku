import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:AngularFirestore, private toastr: ToastrService) { }

  saveData(categoryData:any) {

    this.afs.collection('categories').add(categoryData).then(docRef => {
      console.log(docRef);
      this.toastr.success('Data Inserted Successfully ..!');
      
      // this.afs.doc(`categories/${docRef.id}`).collection('subcategories').add(subCategoryData)
    }).catch(err => { console.log(err)})
  }

  loadData(){

    return this.afs.collection('categories').snapshotChanges().pipe(
       map(actions => {
          return actions.map(a => {
 
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id, data }
 
         })
       })
     )
 
   }

   updateData(id:any, EditeData:any){
    this.afs.collection('categories').doc(id).update(EditeData).then(docRef => {
      this.toastr.success('Data Updated Successfully ..!');
    })
  }

  deleteData(id:any){
    this.afs.collection('categories').doc(id).delete().then(docRef => {
      this.toastr.success('Data Deleted ..!');
    })
  }



}
