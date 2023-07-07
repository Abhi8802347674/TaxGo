import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, of, from } from 'rxjs';
import { map, catchError, mergeMap ,tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';



export class tax {
  id!: string 
  name!: string;
  email!: string;
  dob!: number;
  fees!: number;
}

class PostObj {
  constructor(
    public userId: number,
    public id: string,
    public title: string,
    public body: string
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class TaxServiceService {

  httpHeader = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('6a8b3f92-1a26-8b48-361f239962ea:75bcf1ae-412f-b9a6-7af2f1310784')

     })
  };
  restAPI: string = "https://jsonplaceholder.typicode.com/posts";
  postData = [];
  constructor(private http: HttpClient , private httpservice: HttpService) { }
  ngOnInit() {
    console.log('service')
  }

  getOTP(OTPJsonData: any): Observable<any> {
    return this.http.post<any>('https://app.taxgo.in/api/Opts/SendSMSOtp', OTPJsonData, this.httpHeader)
      .pipe(
        catchError(this.handleError<any>('get otp'))
      );
  }


  getTaxresultList(): Observable<any> {
    return this.http.get<any>('https://app.taxgo.in/api/Infomenu',this.httpHeader)
      .pipe(
        tap(Student => console.log('Info_menu fetched!')),
        catchError(this.handleError<any>('Info_menu', []))
      );
  }

  sendSMS(postData: any): Observable<any> {
    return this.httpservice.sendOTP(postData);
  }
  registerUser(postData: any): Observable<any> {
    return this.httpservice.UserRegister(postData);
  }
  Login(postData: any): Observable<any> {
    return this.httpservice.UserLogin(postData);
  }
  mobileLogin(postData: any): Observable<any> {
    return this.httpservice.RegisteredMobileLogin(postData);
  }
  updateProfile(postData: any): Observable<any> {
    return this.httpservice.updateProfileService(postData);
  }
  submitServiceRequest(postData: any): Observable<any> {
    return this.httpservice.ServicePostRequest(postData);
  }
  getServiceRequest(): Observable<any> {
    return this.httpservice.ServiceGetRequest();
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  // fetchPosts() {
  //   const promise = new Promise<void>((resolve, reject) => {
  //     const URL = 'https://app.taxgo.in/api/Opts/SendSMSOtp';
  //     const data = {
  //       mobile: '8802347674',
  //       otp: '545554',
  //     };
  //     this.http
  //       .post<any>(URL,data,this.httpHeader)
  //       .toPromise()
  //       .then((res: any) => {
  //         this.postData = res.map((res: any) => {
  //           console.log('this.postData',res)
  //           return res;
  //         });
  //         resolve();
  //       },
  //         err => {
  //           reject(err);
  //         }
  //       );
  //   });
  //   return promise;
  // }
}
