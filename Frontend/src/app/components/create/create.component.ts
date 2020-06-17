import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private employeeService: IssueService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      email: ['',[ Validators.required,Validators.email]],
      department:['', Validators.required],
      salary: [null,[Validators.required,Validators.minLength(4),Validators.min(5000)]]
    });
  }

  addEmployee(name, email, department, salary) {
    console.log({name,email,department,salary})
    this.employeeService.addIssue(name, email, department, salary).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
