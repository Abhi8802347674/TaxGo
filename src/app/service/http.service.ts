import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

   options = {
    headers: {   
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('6a8b3f92-1a26-8b48-361f239962ea' +':'+'75bcf1ae-412f-b9a6-7af2f1310784'),
    }
};
profileOptions = {
  headers: {   
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('847bfd22-6538-4ad7-be2d-2000905a09a9' +':'+'b5850a8b-4850-4d99-8999-5d3f740727c2'),
  }
};
  constructor( public http: HttpClient) { }
  
  sendOTP( data: any) {
    const url = 'https://app.taxgo.in/api/Opts/SendSMSOtp/' ;
    return this.http.post(url, data, this.options );
   }

UserRegister( data: any) {
  const url = 'https://app.taxgo.in/api/Account/Rigster';
return this.http.post(url, data, this.options );
}
UserLogin( data: any) {
  const url = 'https://app.taxgo.in/api/Account/login';
return this.http.post(url, data, this.options );
}
RegisteredMobileLogin( data: any) {
  const url = 'https://app.taxgo.in/api/account/mobilelogin';
return this.http.post(url, data, this.options );
}
updateProfileService( data: any) {
  const url = 'https://app.taxgo.in/api/account/profile';
return this.http.post(url, data, this.profileOptions );
}
ServicePostRequest( data: any) {
  const url = 'https://app.taxgo.in/api/Services';
return this.http.post(url, data, this.profileOptions );
}
ServiceGetRequest( ) {
  const url = 'https://app.taxgo.in/api/Services';
return this.http.get(url,  this.profileOptions );
}

}
