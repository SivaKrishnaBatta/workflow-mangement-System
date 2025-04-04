import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private apiUrl = 'http://localhost:3000/post';

  constructor(private http: HttpClient) {}

  getWorkflows(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getWorkflowById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addWorkflow(workflow: any): Observable<any> {
    return this.getWorkflows().pipe(
      map(workflows => {
        const nextId = workflows.length > 0 ? Math.max(...workflows.map(w => w.id)) + 1 : 1;
        return { ...workflow, id: nextId };
      }),
      switchMap(newWorkflow => this.http.post(this.apiUrl, newWorkflow))
    );
  }

  updateWorkflow(id: number, workflow: any): Observable<any> {
    return this.http.put(`http://localhost:3000/post/${id}`, workflow);
  }

  deleteWorkflow(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
