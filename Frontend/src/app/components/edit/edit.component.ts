import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { IssueService } from '../../issue.service';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;
  name: string;
  department: string;
  email: string;
  salary: number;

  // tslint:disable-next-line:max-line-length
  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      attendance: '',
      targetAchievement: '',
      qualityOfWork: '',
      productivity: '',
      review: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.name=this.issue.name;
        this.email=this.issue.email;
        this.department=this.issue.department;
        this.salary=this.issue.salary;
        this.updateForm.get('attendance').setValue(this.issue.attendance);
        this.updateForm.get('targetAchievement').setValue(this.issue.targetAchievement);
        this.updateForm.get('qualityOfWork').setValue(this.issue.qualityOfWork);
        this.updateForm.get('productivity').setValue(this.issue.productivity);
      });
    });
  }

  updateIssue(review, attendance, targetAchievement, qualityOfWork, productivity) {
    this.issueService.updateIssue(this.id, review, attendance, targetAchievement, qualityOfWork, productivity).subscribe(() => {
      this.snackBar.open('Appraisal updated', 'OK', {
        duration: 3000
      });
    });
  }

}
