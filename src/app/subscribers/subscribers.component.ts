import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../service/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  sunsValArray!: Array<any>
  constructor(private subService:SubscribersService) { }

  ngOnInit(): void {
    this.subService.subscribers().subscribe(val=> {
      this.sunsValArray = val;
    })
  }

  onDeleteSubs(subsId:any){
    this.subService.deleteSubscribers(subsId);
  }

}
