import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  userData:User=new User();
  isPasswordFocussed!:any;
  responseStatus!:any;

  @ViewChild("myForm") myForm!:NgForm;

  constructor(private http:HttpClient,private toastr:ToastrService){
    
  }

  ngOnInit(): void {
      this.userData.author="Pratik Pawar"
      this.toastr.success("My name is Pratik Pawar","Hii !!");
  }

  register(){
    console.log(this.userData);
    let url=`http://localhost:8080/register`;
   
    console.log(this.userData);
    localStorage.setItem("userdata",JSON.stringify(this.userData));
    this.http.post(url,this.userData).subscribe((response)=>{
      console.log(response);
      this.responseStatus=response;
      if(this.responseStatus.status){
        this.toastr.success(this.responseStatus.messageIfAny,"Thank you !");
      }
    })
    this.myForm.resetForm();

  }
  onPasswordBlur(){
    this.isPasswordFocussed=true;
  }
  onPasswordFocus(){
    this.isPasswordFocussed=false;
  }
}

export class User{
  firstName!:string;
  lastName!:string;
  password!:string;
  email!:string;
  phoneNumber!:string;
  organizationName!:string;
  organizationAddress!:string;
  author!:string

}