import { Component, ElementRef } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { userService } from "../listusers/user.service";

@Component({
    selector:"edit",
    templateUrl:"./edit.html",
    styleUrls:['./edit.css']
})

export class editUser{
    id;
    formUser:FormGroup;
    userData$:any;
    records: FormArray;
    userData:any;
    protected msg:string;
   constructor(private route: ActivatedRoute, private ser: userService, private eleRef:ElementRef, private fb: FormBuilder){
    
   }
   ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.userData$ =  this.ser.getUser(this.id).subscribe((data)=>{
        this.userData = data;
        data.userrecords.records.forEach(element => {
            this.addItem(element);
           
        });
    });
    this.formUser = new FormGroup({
     records : new FormArray([])
    })
 }

 createItem(data): FormGroup {
    return this.fb.group({
        course_title: new FormControl(data.course_title),
        course_code:  new FormControl(data.course_code),
        country:  new FormControl(data.country),
        training_provider:  new FormControl(data.training_provider),
        completed_on:  new FormControl(data.completed_on),
        valid_from:  new FormControl(data.valid_from),
        valid_until:  new FormControl(data.valid_until),
        previous_course_valid_until:  new FormControl(data.previous_course_valid_until),
        status:  new FormControl(data.status)
    });
  }

  addItem(data): void {
    this.records = this.formUser.get('records') as FormArray;
    this.records.push(this.createItem(data));
  }
  updateUser(){
    if(this.formUser.valid){
        this.userData.userrecords.records = this.formUser.getRawValue().records;
        this.ser.updateUser(this.userData).subscribe((data)=>{
          if(data.employeeId && data.delegate_id){
            this.msg = 'User Updated SucessFully'
    
            setTimeout(()=>{
                this.msg = '';
            },2000)
           }
        })
    }
   
  }
}