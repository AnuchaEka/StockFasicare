import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  validations_form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router :Router  
  ) { }

  ngOnInit() {
    

    this.validations_form = this.formBuilder.group({

      username: new FormControl('sss', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      
      name: new FormControl('sss', Validators.required),
      lastname: new FormControl('sss', Validators.required),
      email: new FormControl('kead@gmai.com', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl('0909', Validators.compose([
        Validators.pattern('^[0-9]+$')
      ])),

    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'กรอกชื่อผู้ใช้งานด้วยค่ะ!' },
      { type: 'pattern', message: 'กรอก a-zA-Z0-9 เท่านั้นค่ะ!' },
    ],
    'name': [
      { type: 'required', message: 'กรอกชื่อด้วยค่ะ!' }
    ],
    'lastname': [
      { type: 'required', message: 'กรอกนามสกุลด้วยค่ะ!' }
    ],
    'email': [
      { type: 'required', message: 'กรอกอีเมลด้วยค่ะ!.' },
      { type: 'pattern', message: 'กรอกอีเมลให้ถูกต้องด้วยค่ะ' }
    ],
    'phone': [
      { type: 'pattern', message: 'กรอกเฉพาะตัวเลขเท่านั้นค่ะ!' }
    ],
    


  }

  onSubmit(values){
    console.log(values);
    //this.router.navigate(["/dashboard"]);
}


  // async save() {
  //   const loader = await this.loadingCtrl.create({
  //     duration: 2000
  //   });

  //   loader.present();
  //   loader.onWillDismiss().then(() => {
  //     //this.navCtrl.navigateRoot('/home-results');
  //   });
  // }

}
