import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TakePollService } from './take-poll.service';

@Component({
  selector: 'app-take-poll',
  templateUrl: './take-poll.component.html',
  styleUrls: ['./take-poll.component.css']
})
export class TakePollComponent implements OnInit {
  loader: boolean;
  pollList: any;
  takePollForm: FormGroup;
  voted: Array<string> = [];

  constructor(
    private formBuilder: FormBuilder,
    private takePollService: TakePollService) { }

  ngOnInit() {
    this.voted = JSON.parse(localStorage.getItem("voted")) || [];
    this.viewPoll();
    this.createTakePollForm();
  }

  createTakePollForm() {
    this.takePollForm = this.formBuilder.group({
      radio: ['']
    })
  }

  async viewPoll() {
    try {
      this.loader = true;
      const data = await this.takePollService.viewPoll();
      this.loader = false;
      if (!data['error']) {
        this.pollList = data['data'];
        this.pollList.forEach(listItem => {
          listItem['voted'] = false;
          if (this.voted.includes(listItem["_id"])) {
            listItem['voted'] = true;
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async submitPoll(id, option) {
    try {
      this.loader = true;
      await this.takePollService.submitPoll(id, option);

      this.voted.push(id);
      localStorage.setItem("voted", JSON.stringify(this.voted));
      this.pollList.forEach(listItem => {
        if (listItem["_id"] === id) {
          listItem['voted'] = true;
        }
      });

      this.takePollForm.reset();
      this.loader = false;
    } catch (error) {
      console.error(error);
    }
  }

}
