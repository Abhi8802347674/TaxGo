import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaxServiceService } from 'src/app/service/tax-service.service';
import { UiService } from 'src/app/service/ui-service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {
  tableInfoMenuDetails=[]

  // tableInfoMenuDetails =[
  //   {
  //      "Id":"7DAEF077-D415-4C9F-98C8-14EBA25A83EA",
  //      "InfoMenuId":"2A94D51D-66BB-4F75-BCD5-16957818F7F8",
  //      "FieldName":"Year",
  //      "FieldValue":"2022-2023, 2023-2024",
  //      "FieldType":"Dropdown",
  //      "Position":1,
  //      "FieldValueArray":[
  //         "2022-2023",
  //         " 2023-2024"
  //      ]
  //   },
  //   {
  //      "Id":"CAA51EA0-F89B-41AE-ADF6-836A5EAEE591",
  //      "InfoMenuId":"2A94D51D-66BB-4F75-BCD5-16957818F7F8",
  //      "FieldName":"First Name",
  //      "FieldValue":null,
  //      "FieldType":"Textbox",
  //      "Position":2
  //   },
  //   {
  //      "Id":"52659D95-6CA5-48BF-A32B-35F788BCF113",
  //      "InfoMenuId":"2A94D51D-66BB-4F75-BCD5-16957818F7F8",
  //      "FieldName":"Last Name",
  //      "FieldValue":null,
  //      "FieldType":"Textbox",
  //      "Position":3
  //   },
  //   {
  //      "Id":"40378CA1-0726-4507-A468-6923B2AFD612",
  //      "InfoMenuId":"2A94D51D-66BB-4F75-BCD5-16957818F7F8",
  //      "FieldName":"PAN Card",
  //      "FieldValue":null,
  //      "FieldType":"Textbox",
  //      "Position":4
  //   },
  //   {
  //      "Id":"BE487AF1-4AA4-473F-B0FF-55F74B4720D4",
  //      "InfoMenuId":"2A94D51D-66BB-4F75-BCD5-16957818F7F8",
  //      "FieldName":"Upload PAN Card",
  //      "FieldValue":null,
  //      "FieldType":"SingleFile",
  //      "Position":5
  //   },
  //   {
  //     "Id":"BE487AF1-4AA4-473F-B0FF-55F74B4720D4",
  //     "InfoMenuId":"2A94D51D-66BB-4F75-BCD5-16957818F7F8",
  //     "FieldName":"Upload PAN Card2",
  //     "FieldValue":null,
  //     "FieldType":"SingleFile",
  //     "Position":6
  //  },
  //   {
  //      "Id":"CC68167B-A4ED-4D31-B6BA-029819B180E9",
  //      "InfoMenuId":"2A94D51D-66BB-4F75-BCD5-16957818F7F8",
  //      "FieldName":"Upload Form 16",
  //      "FieldValue":null,
  //      "FieldType":"MultiFiles",
  //      "Position":7
  //   },
  //   {
  //      "Id":"0E95459D-3476-4575-AA66-CBEC6D2ED3BB",
  //      "InfoMenuId":"2A94D51D-66BB-4F75-BCD5-16957818F7F8",
  //      "FieldName":"Passport No.",
  //      "FieldValue":null,
  //      "FieldType":"Textbox",
  //      "Position":8
  //   }
  // ];
  clickedImage: any;
  // fileName = '';
  MultiChoosefileName: any;
  MultiClickedImage: any;
  dynamicForm = this.fb.group({});
  DynamicFormControlData : any=[];
  dataArray: any=[];
  choosenSingleFile: any;
  obj4:any;
  // base64 = 'base64';
  // base64Image: string;

  selectedFilesMap = new Map()

  MultiselectedFilesMap = new Map()

 
addImageDataToMap(fieldId:string,imageData:any,fName:string){
    this.selectedFilesMap.set(fieldId,{fileName:fName,file:imageData}) 
}
addMultiImageDataToMap(fieldId:string,imageData:any,fName:string){
  this.MultiselectedFilesMap.set(fieldId,{fileName:fName,file:imageData}) 
}

removeMultiImageDataFromMap(fieldId:string){
  if (this.MultiselectedFilesMap.has(fieldId)){
   this.MultiselectedFilesMap.delete(fieldId) 
 } 
}
removeImageDataFromMap(fieldId:string){
   if (this.selectedFilesMap.has(fieldId)){
    this.selectedFilesMap.delete(fieldId) 
  } 
}

getFileNameWithId(fieldId:string){
  if (this.selectedFilesMap.has(fieldId)){
    let obj = this.selectedFilesMap.get(fieldId)
    return obj.fileName
  }
  return ""
}
getMultiFileNameWithId(fieldId:string){
  if (this.MultiselectedFilesMap.has(fieldId)){
    let obj = this.MultiselectedFilesMap.get(fieldId)
    return obj.fileName
  }
  return ""
}

  constructor(private actionSheetCtrl: ActionSheetController, public file_Chooser: FileChooser,
    public taxservice: TaxServiceService,public router: Router, public filePath: FilePath,
    public loadingController: LoadingController,public uiservice: UiService, public alertController : AlertController,
    private camera: Camera, public chooser: Chooser, private fb: FormBuilder) {
    let formData = history.state.TaxData;
    console.log('hey',formData)
   this.tableInfoMenuDetails = formData.InfoMenuDetail
   console.log('formData',formData.InfoMenuDetail)
    this.tableInfoMenuDetails.forEach((element: any) => {
      if(element.FieldType =='Dropdown'){
        element.FieldValueArray =  element.FieldValue.split(',');
        // console.log(element.FieldValue.split('.'))
      }
    });
    // console.log('tableInfoMenuDetails',this.tableInfoMenuDetails)
    
    this.setDynamicForm(this.tableInfoMenuDetails)
   
   }
   ngOnInit() {
  }
   setDynamicForm(controls: any){
    this.dynamicForm.controls
    const group: any = {};
    for( const control of controls){
      const validators = [];
      if(control.IsMandatory){
        validators.push(Validators.required)
      }
      if(control.FieldName != 'MultiFiles'){
        this.dynamicForm.addControl(control.FieldName, this.fb.control(control.value, validators));
      }
      if(control.FieldName == 'MultiFiles'){
        this.dynamicForm.addControl(control.FieldName, this.fb.array([this.initAttachmentFields()]));
      }
   
      // console.log('group[control.FieldName]',this.dynamicForm.controls[control.FieldName])
    }
   }

   initAttachmentFields(): FormGroup{
    return this.fb.group({
      fileName: ['',Validators.required]
    });
   }
   saveForm(){
    console.log(this.dynamicForm.value);
    let array1: any = [];
    let obj1 = {serviceid:"",servicecontrols: []};
    let serviceId: string='';
    var data = this.dynamicForm.value
    Object.entries(data).forEach(([key, val]) => {
    let oldObj = this.tableInfoMenuDetails.find((obj1: any) => {
    return obj1.FieldName === key
     })
     if(serviceId == ''){
      serviceId=oldObj.InfoMenuId;
     }
    let obj3 = { controldata : val } 
    let array2 = []
    array2.push(obj3)
    if(oldObj.FieldType == 'SingleFile'){
      array2 = []
      let imageObj = this.selectedFilesMap.get(oldObj.Id)
      array2.push(imageObj)
    }

  //   let finalObjMultiFiles = [{
  //     fileName : this.MultiChoosefileName,
  //     file: this.MultiClickedImage
  //   }]

      if(oldObj.FieldType == 'MultiFiles'){
        array2 = []
        let imageObj = this.MultiselectedFilesMap.get(oldObj.Id)
        array2.push(imageObj)
      }
    let obj2 = { controlid: oldObj.Id, controlname: key ,servicecontroldata : array2}
    array1.push(obj2)
   })

   
   console.log(array1);

  obj1.serviceid = serviceId;
  obj1.servicecontrols = array1
  console.log(obj1)
  console.log(JSON.stringify(obj1)) 
  console.log(JSON.parse(JSON.stringify(obj1))) 
  let stringParamsData = JSON.stringify(obj1)
  this.postServiceRequest(stringParamsData)
   }
   async postServiceRequest(JsonParams: any){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();
   
    this.taxservice.submitServiceRequest(JsonParams).subscribe(
      async (res: any) => {
        loading.dismiss();
        console.log(res);
        this.presentAlertConfirm('Submitted successfully')
      },
      (error: any) => {
        loading.dismiss();
        this.uiservice.showErrorAlert('Something went wrong ..!!')
        console.log(error);
        alert(error);
      }
    );
  }

 
  serviceRequest(tableInfoMenuDetails: any){
    console.log('tableInfoMenuDetails',tableInfoMenuDetails)
    
  }
  chooseCameraOptions(fieldId :string ,file: any){
 let modalSelectionButton;
 if(file == 'singleFile'){
  modalSelectionButton=[
    {
    text: 'Open camera',
    handler: () => {
    this.OpenCamera(fieldId,this.camera.PictureSourceType.CAMERA,0);
    }
  },{
    text: 'Open Gallery',
    handler: () => {
    this.OpenCamera(fieldId,this.camera.PictureSourceType.PHOTOLIBRARY,1)
    }
  },
  {
    text: 'Select Pdf',
    handler: () => {
   // this.OpenCamera(this.camera.PictureType.camera,0)
   this.fileChooser(0,fieldId)
    }
  },
  {
    text: 'Cancel',
    role:  'cancel',
    handler: () => {
    }
  }
   ]
 }else{
  modalSelectionButton=[
    {
    text: 'Open camera',
    handler: () => {
    this.multiFileOpenCamera(fieldId,this.camera.PictureSourceType.CAMERA,0);
    }
  },{
    text: 'Open Gallery',
    handler: () => {
    this.multiFileOpenCamera(fieldId,this.camera.PictureSourceType.PHOTOLIBRARY,1)
    }
  },
  {
    text: 'Select Pdf',
    handler: () => {
      this.fileChooser(1,fieldId)
   // this.OpenCamera(this.camera.PictureType.camera,0)
    }
  },
  {
    text: 'Cancel',
    role:  'cancel',
    handler: () => {
    }
  }
   ]
 }

  const actionSheet = this.actionSheetCtrl.create({
    header : "Select any File",
    buttons: modalSelectionButton
  }).then(actionSheet => actionSheet.present())
  }

  OpenCamera(fieldId:string,sourceType: any, acceptedPdf: any){
  console.log(sourceType,acceptedPdf)
  const options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
}
    this.camera.getPicture(options).then((imageData) => {
      let rFile = (Math.random() + 1).toString(36).substring(7); 
     let fileName = rFile +'001211image.jpg' //imageData.substr(imageData.lastIndexOf('/') + 1); //'taxGo.jpg'//
     console.log('fileName',fileName)
    // var filext =  fileName.substr(fileName.lastIndexOf('/') + 1);
    // console.log('filext',filext)
      this.addImageDataToMap(fieldId,imageData,fileName)
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }
  removeAttachmentSingleFile(fieldId :string){
    this.removeImageDataFromMap(fieldId)
  }
  removeAttachmentMultiFile(fieldId :string){
    this.removeMultiImageDataFromMap(fieldId);
  }

  multiFileOpenCamera(fieldId:string,sourceType: any, acceptedPdf: any){
    console.log(sourceType,acceptedPdf)
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL, //FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
      this.camera.getPicture(options).then((imageData) => {

        let rFile = (Math.random() + 1).toString(36).substring(7);
        console.log("random", rFile); 

        let fileName = rFile +'0111011image.jpg' // imageData.substr(imageData.lastIndexOf('/') + 1);
        // console.log('fileName',this.fileName)
        // console.log('imageData',imageData)
        this.addMultiImageDataToMap(fieldId,imageData,fileName)
       // this.MultiClickedImage= imageData;
      }, (err) => {
        console.log(err);
        // Handle error
      });
    }

    fileChooser(data,fieldId){
      const reader = new FileReader();
      this.chooser.getFile().then(file =>{
        let fileExt = file?.name.split('.').pop()?.toLowerCase();
        if(fileExt=='pdf'){
          this.checkBase64Size(data,fieldId,file, file?.name)
          // let base64String =  reader.readAsDataURL(f);
         // console.log('base64String',base64String)
        }
      })
      .catch( (err)=>{
        let errmsg = 'no pdf selected';
        console.log(errmsg)
      })
    }
    checkBase64Size(data,fieldId: any, base64file: any, fileName: any){
    let PDFfileName =  fileName.split('.').pop().toLowerCase();
    console.log('PDFfileName',PDFfileName)
    console.log('fileName',fileName)
    console.log('base64file',base64file)
     let originalBase64: any = base64file.dataURI.split(',');
     if(originalBase64.length>0){
      originalBase64 = originalBase64[1];
     }else{
      originalBase64 = originalBase64[0];
     }
 
   console.log('originalBase64',originalBase64)

 
   var fileReader = new FileReader();
   fileReader.readAsDataURL(originalBase64)
   fileReader.onload = () => {
     console.log('base64String',fileReader.result)
   }
    // here this method will return base64 string enjoy 
  //  this.file_Chooser.open().then((data)=>{
  //   alert("chooser "+data);
  //   this.filePath.resolveNativePath(data).then(filePath => {
  //     alert("filepath "+filePath)
  //     originalBase64.encodeFile(filePath).then(base64File => {
  //       alert("base64 " + base64File);
  //     }).catch(err => {
  //       alert("erreur base64 => " + err);
  //     });
  //   }).catch(err => {
  //     alert("erreur filepath => " +err)
  //   });
  //   }).catch((error)=>{
  //     alert("erreur chooser => " +error);
  //   })
     if(data == 0){
      this.addImageDataToMap(fieldId,base64file,fileName)
     }else{
      this.addMultiImageDataToMap(fieldId,base64file,fileName)
     }
    }
    sanitizebase64(originalBase64: any){
      let base64length = originalBase64.length
      let remainingCharacter = base64length % 4;
      if(remainingCharacter !=0){
        let paddingChar = '='.repeat(4 - remainingCharacter);
        let paddingCharbase64String = originalBase64 + paddingChar
        return paddingCharbase64String
      }else{
        return originalBase64;
      }
    }

    async presentAlertConfirm(message) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            },
          },
          {
            text: 'Okay',
            handler: () => {
             this.router.navigate(['/homepage']);
            },
          },
        ],
      });
      await alert.present();
    }
}
