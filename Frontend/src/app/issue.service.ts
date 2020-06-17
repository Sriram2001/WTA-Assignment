import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:3000/employees';  

  constructor(private http: HttpClient) { }

  getIssues() {
    return this.http.get(`${this.uri}/`,{headers});
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/${id}`,{headers});
  }

  addIssue(name, email, department, salary) {
    const issue = {
      name,
      email,
      department,
      salary
    };
    return this.http.post(`${this.uri}/`, issue, {headers});
  }

  updateIssue(id, review, attendance, targetAchievement, qualityOfWork, productivity) {
    const issue = {
      review,
      attendance,
      targetAchievement,
      qualityOfWork,
      productivity
    };
    return this.http.patch(`${this.uri}/${id}`, issue, {headers});
  }

  deleteIssue(id) {
    return this.http.delete(`${this.uri}/${id}`, {headers});
  }
}
