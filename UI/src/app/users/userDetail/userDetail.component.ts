import { Component, ElementRef } from "@angular/core";
import { FormControl, FormControlName, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { userService } from "../listusers/user.service";

@Component({
    selector:"userDetail",
    templateUrl:"./userDetail.html",
    styleUrls:['./userdetail.css']
})

export class userDetail{
    id;
    formUser:FormGroup;
    userData$:any;
    accData:any;
   constructor(private route: ActivatedRoute, private ser: userService, private eleRef:ElementRef){
    
   }
   ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.userData$ =  this.ser.getUser(this.id);
    this.userData$.subscribe((data)=>{
        console.log(data)
        this.accData = data.userrecords.records
    }) 
    
 }
 
 toggleAccordian(event, index) {
    const element = event.target;
    element.classList.toggle("active");
    if (this.accData[index].isActive) {
      this.accData[index].isActive = false;
    } else {
      this.accData[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
    }