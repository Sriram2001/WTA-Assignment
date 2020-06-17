import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material";

import { Issue } from "../../issue.model";
import { IssueService } from "../../issue.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  issues: Issue[];
  displayedColumns = ["name", "rating", "actions"];

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService.getIssues().subscribe((data: Issue[]) => {
      this.issues = data;
      console.log(this.issues);
    });
  }

  getRating(employee) {
    if (employee.appraised) {
      let res = 0;
      res += employee.attendance;
      res += employee.performance;
      res += employee.qualityOfWork;
      res += employee.targetAchievement;
      res = res / 5;
      return res.toString();
    } else {
      return "Unrated";
    }
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }
}
