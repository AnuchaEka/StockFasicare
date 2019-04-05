import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { Router,ActivatedRoute, } from  "@angular/router";
import { ApiService } from '../../webservie/api.service';
import { PasswordValidator } from './password.validator';

@Component({
  selector: 'app-changpassword',
  templateUrl: './changpassword.page.html',
  styleUrls: ['./changpassword.page.scss'],
})
export class ChangpasswordPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router :Router  ,
    private api :ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.required,
        ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

  

    this.validations_form = this.formBuilder.group({

      oldpassword: new FormControl('', Validators.required),
      matching_passwords: this.matching_passwords_group,

    });
  }

  validation_messages = {
    
    'oldpassword': [
      { type: 'required', message: 'กรอกรหัสผ่านเดิมด้วยค่ะ' },
    ],
    'password': [
      { type: 'required', message: 'กรอกรหัสผ่านใหม่ด้วยค่ะ' },
    ],
    'confirm_password': [
      { type: 'required', message: 'ยืนยันรหัสผ่านใหม่ด้วยค่ะ' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'รหัสผ่านไม่ตรงกันค่ะ' }
    ],

  }

  async onSubmit(values){
    //console.log(values);

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
      });
      await loading.present();
      await this.api.updateData('account/changpassword',this.route.snapshot.paramMap.get('id'),values)
      .subscribe(res => {
     //   console.log(res);
        loading.onWillDismiss().then(() => {
          this.api.presentToast(res.message);
          this.validations_form.reset();
          this.matching_passwords_group.reset();
          //this.router.navigate(['dashboard']);
          
           });
      
        }, (err) => {

          this.api.presentToast('ไม่พบสัญญาณ internet หรือไม่สามารถติดต่อ server ได้');

        });
}


}
