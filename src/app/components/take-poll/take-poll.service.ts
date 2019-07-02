import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TakePollService {

  constructor(private http: HttpClient) { }

  viewPoll() {
    return this.http.get(`${environment.apiBase}/list_polls`).toPromise();
  }

  submitPoll(id,body){
    this.http.get(`${environment.apiBase}/do_vote?id=${id}&option_text=${body.radio}`).toPromise();
  }
}
