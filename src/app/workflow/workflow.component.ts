import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkflowService } from '../workflow.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'id', 'lastEdited', 'description', 'pin', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  selectedWorkflowId: number = 0;
  private subscriptions: Subscription = new Subscription();
  showExecuteDialog: boolean = false;
  selectedProcessName: string = '';

  constructor(
    private workflowService: WorkflowService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const sub = this.workflowService.getWorkflows().subscribe(
      (data) => {
        this.dataSource.data = data.map(item => ({
          id: item.id || '',
          name: item.name || 'Untitled',
          lastEdited: item.editedOn || 'N/A',
          description: item.description || 'No Description',
          pin: item.pin || false
        }));
      },
      (error) => {
        console.error('Error fetching workflows:', error);
        this.snackBar.open('Failed to load workflows', 'Close', { duration: 2000 });
      }
    );
    this.subscriptions.add(sub);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToCreateProcess() {
    this.router.navigate(['/create']); // Navigate to the create workflow page
  }

  editAction(element: any) {
    this.router.navigate(['/create', element.id]); // Navigate to edit workflow
  }

  togglePin(element: any) {
    element.pin = !element.pin;
    this.dataSource.data = [...this.dataSource.data].sort((a, b) => Number(b.pin) - Number(a.pin));
  }

  openDeleteDialog(id: number) {
    this.selectedWorkflowId = id;
    const confirmDelete = confirm('Are you sure you want to delete this workflow?');

    if (confirmDelete) {
      this.confirmDelete();
    }
  }

  confirmDelete() {
    const sub = this.workflowService.deleteWorkflow(this.selectedWorkflowId).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(workflow => workflow.id !== this.selectedWorkflowId);
        this.snackBar.open('Successfully deleted', 'Close', { duration: 2000 });
      },
      (error) => {
        console.error('Error deleting workflow:', error);
        this.snackBar.open('Failed to delete workflow', 'Close', { duration: 2000 });
      }
    );
    this.subscriptions.add(sub);
  }

  toggleSidenav() {
    console.log('Sidenav toggle clicked');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Clean up subscriptions to avoid memory leaks
  }

  executeAction(element: any) {
    this.selectedProcessName = element.name;
    this.showExecuteDialog = true;
  }

  closeDialog() {
    this.showExecuteDialog = false;
  }

  confirmExecution() {
    console.log('Executing process:', this.selectedProcessName);
    this.showExecuteDialog = false; // Close the dialog after execution
  }
}


