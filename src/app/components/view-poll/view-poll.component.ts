import { Component, OnInit } from '@angular/core';
import { ViewPollService } from './view-poll.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {
  apiInProgress: boolean;
  newOptionForm: FormGroup;
  pollId: number;
  pollList: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private viewPollService: ViewPollService
  ) { }

  ngOnInit() {
    this.viewPoll();
  }

  inputForm() {
    this.newOptionForm = this.formBuilder.group({
      newOpt: ['']
    });
  }

  async viewPoll() {
    const data = await this.viewPollService.viewPoll();
    if (!data['error']) {
      this.pollList = data['data'];
    }
  }

  async deletePoll(id: string) {
    this.apiInProgress = true;
    try {
      const data = await this.viewPollService.deletePoll(id);
      if (!data["error"]) {
        this.pollList.splice(id, 1);
      } else {
        console.error("Something went wrong: poll not found");
      }
      this.apiInProgress = false;
    } catch (error) {
      console.error(error);
      this.apiInProgress = false;
    }
  }

  deleteOption(optionToDelete, pollToDelete) {
    this.pollList.forEach(pollItem => {
      if (pollItem._id === pollToDelete._id) {
        this.viewPollService.deleteOption(pollItem._id, optionToDelete);
        pollItem.options = pollItem.options.filter(option => option.option !== optionToDelete);
      }
    })
  }


  editPoll(id, newTitle) {
    this.viewPollService.editPoll(id, newTitle);
  }

  setEditPollId(id) {
    this.pollId = id;
  }

  addOption(id, newOption) {
    this.pollList.forEach(async pollItem => {
      if (pollItem._id === id) {
        await this.viewPollService.addOption(id, newOption);
        this.newOptionForm = null;
      }
      this.viewPoll();
    });
  }

}