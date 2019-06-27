import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ViewPollService {

  constructor(private http: HttpClient) { }

  viewPoll() {
    return this.http.get(`${environment.apiBase}/list_polls`).toPromise();
  }

  deletePoll(id) {
    return this.http.get(`${environment.apiBase}/delete_poll?id=${id}`).toPromise();
  }

  deleteOption(id, option) {
    return this.http.get(`${environment.apiBase}/delete_poll_option?id=${id}&option_text=${option}`).toPromise();
  }

  editPoll(id, newTitle) {
    return this.http.get(`${environment.apiBase}/update_poll_title?id=${id}&title=${newTitle}`).toPromise();
  }

  addOption(id, body) {
    return this.http.get(`${environment.apiBase}/add_new_option?id=${id}&option_text=${body.newOpt}`).toPromise();
  }

}