import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  constructor(
    public http:HttpClient
  ) { }

  get(_rota:string = '/',_params:any = {}){
    return this.http.get(
      "http://localhost:8080" + _rota,
      {params:_params}
    );
  }

  post(formData:any,_rota:string = ''){
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:8080' + _rota,formData,httpOptions);
  }

  delete(_rota:string){
    return this.http.delete("http://localhost:8080" + _rota);
  }

  put(formData:any,rota:string = ''){
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json'
      })
    };

    return this.http.put('http://localhost:8080/' + rota,formData,httpOptions);
  }

  getById(rota: string) {
    return this.http.get("http://localhost:8080" + rota);
  }
}
