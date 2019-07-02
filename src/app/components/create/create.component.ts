import { Component, OnInit } from '@angular/core';
import { CreateService } from './create.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  apiInProgress: boolean;
  loader: boolean;
  pollForm: FormGroup;
  success: number;

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

  get poll() {
    return this.pollForm.get('poll');
  }

  get option1() {
    return this.pollForm.get('option1');
  }

  get option2() {
    return this.pollForm.get('option2');
  }

  get option3() {
    return this.pollForm.get('option3');
  }

  get option4() {
    return this.pollForm.get('option4');
  }

  async onAddPoll(formData) {
    try {
      this.apiInProgress = true;
      this.loader = true;
      const a = await this.createService.addPoll(formData);
      if (a["error"] === 0) {
        this.success = 1;
      }
      this.loader = false;
      this.pollForm.reset();
      this.apiInProgress = false;
    } catch (error) {
      console.error(error);
      this.apiInProgress = false;
    }
  }
}
