import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http: HttpClient) { }

  addPoll(body) {
    const addPollUrl = `title=${body.poll}&options=${body.option1}____${body.option2}____${body.option3}____${body.option4}`; 
    return this.http.get(`${environment.apiBase}/add_poll?${addPollUrl}`).toPromise();
  }
}
