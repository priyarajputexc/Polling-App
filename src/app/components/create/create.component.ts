import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CreateService } from './create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  apiInProgress: boolean;
  pollForm: FormGroup;

  constructor(
    private createService: CreateService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.createPoll();
  }

  createPoll() {
    this.pollForm = this.formBuilder.group({
      poll: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required]
    });
  }

  async onAddPoll(formData) {
    this.apiInProgress = true;
    try {
      await this.createService.addPoll(formData);
      this.pollForm.reset();
      this.apiInProgress = false;
    } catch (error) {
      console.error(error);
      this.apiInProgress = false;
    }
  }

}
