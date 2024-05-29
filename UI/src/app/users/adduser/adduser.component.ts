import { Component, ElementRef } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { userService } from "../listusers/user.service";

@Component({
    selector:"addUser",
    templateUrl:"./adduser.html",
    styleUrls:['./adduser.css']
})

export class addUser{
    formUser:FormGroup;
    userData$:any;
    records:any;
    delgateId = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    EmpId = '1234567890';
    protected msg:string;
   constructor(private route: ActivatedRoute, private ser: userService, private eleRef:ElementRef,private fb: FormBuilder){
    
   }
   ngOnInit() {
    this.formUser = new FormGroup({
        found: new FormControl(false),
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        records : new FormArray([])
       })
    }
    createItem(): FormGroup {
        return this.fb.group({
            course_title: new FormControl(),
            course_code:  new FormControl(),
            country:  new FormControl(),
            training_provider:  new FormControl(),
            completed_on:  new FormControl(),
            valid_from:  new FormControl(),
            valid_until:  new FormControl(),
            previous_course_valid_until:  new FormControl(),
            status:  new FormControl()
        });
      }
      addItem(): void {
        this.records = this.formUser.get('records') as FormArray;
        this.records.push(this.createItem());
      }


      addUser(){
        let addUserData:any = {};
        addUserData['employeeId'] = this.generateRandom(this.EmpId,6);
        addUserData['delegate_id'] = this.generateRandom(this.delgateId,10);
        addUserData['userrecords'] = this.formUser.getRawValue();
        addUserData['userrecords']['delegate_id'] = addUserData.delegate_id;
        console.log(addUserData)
        this.ser.addUser(addUserData).subscribe((data)=>{
           if(data.employeeId && data.delegate_id){
            this.msg = 'User Added SucessFully'
    
            setTimeout(()=>{
                this.msg = '';
            },2000)
           }
        })
      }

      generateRandom(str,len){
        var ran = []
        for(let i=0;i<len;i++){
            let num = Math.floor(Math.random()*str.length);
            ran.push(str[num]|| 'Y')
        }
        return ran.join('');
      }
      

}