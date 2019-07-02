import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewPollService } from './view-poll.service';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {
  apiInProgress: boolean;
  loader: boolean;
  newOptionForm: FormGroup;
  pollId: string;
  pollList: any;
  pollOptionId: number;

  constructor(
    private formBuilder: FormBuilder,
    private viewPollService: ViewPollService
  ) { }

  ngOnInit() {
    this.viewPoll();
  }

  inputForm() {
    this.newOptionForm = this.formBuilder.group({
      newOption: ['', Validators.required]
    });
  }

  async viewPoll() {
    try {
      this.loader = true;
      const data = await this.viewPollService.viewPoll();
      this.loader = false;
      if (!data['error']) {
        this.pollList = data['data'];
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deletePoll(id: string) {
    this.apiInProgress = true;
    try {
      const data = await this.viewPollService.deletePoll(id);
      this.apiInProgress = false;
      if (!data["error"]) {
        this.pollList.splice(id, 1);
      } else {
        console.error("Something went wrong: poll not found");
      }
    } catch (error) {
      console.error(error);
      this.apiInProgress = false;
    }
  }

  deleteOption(optionToDelete, pollToDelete) {
    this.apiInProgress = true;
    this.pollList.forEach(async pollItem => {
      if (pollItem._id === pollToDelete._id) {
        await this.viewPollService.deleteOption(pollItem._id, optionToDelete);
        this.apiInProgress = false;
        pollItem.options = pollItem.options.filter(option => option.option !== optionToDelete);
      }
    })
  }


  async editPoll(id, newTitle) {
    this.apiInProgress = true;
    try {
      await this.viewPollService.editPoll(id, newTitle);
      this.pollId="";
    } catch (error) {
      console.error(error);
    }
    this.apiInProgress = false;
  }

  setEditPollId(id) {
    this.pollId = id;
  }

  addOption(id, newOption) {
    this.apiInProgress = true;
    this.pollList.forEach(async pollItem => {
      if (pollItem._id === id) {
        await this.viewPollService.addOption(id, newOption);
        this.newOptionForm = null;
      }
      this.apiInProgress = false;
      this.viewPoll();
    });
  }

  setPollId(id) {
    this.pollOptionId = id;
  }

}