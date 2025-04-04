import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['./create-workflow.component.css']
})
export class CreateWorkflowComponent implements OnInit {
  workflowForm!: FormGroup;
  isEditMode: boolean = false;
  workflowId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private workflowService: WorkflowService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.workflowForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.workflowId = +id;
        this.loadWorkflowDetails(this.workflowId);
      }
    });
  }

  loadWorkflowDetails(id: number) {
    this.workflowService.getWorkflowById(id).subscribe(workflow => {
      if (workflow) {
        this.workflowForm.patchValue({
          name: workflow.name,
          description: workflow.description || ''
        });
      }
    }, error => {
      console.error('Error loading workflow details:', error);
    });
  }

  onSubmit() {
    if (this.workflowForm.invalid) {
      return;
    }

    const formData = this.workflowForm.value;
    const editedOn = `${formData.name} | ${new Date().toLocaleString()}`;

    if (this.isEditMode && this.workflowId !== null) {
      const updatedWorkflow = { 
        id: this.workflowId, 
        ...formData, 
        editedOn 
      };

      this.workflowService.updateWorkflow(this.workflowId, updatedWorkflow).subscribe(() => {
        console.log("Workflow updated successfully!");
        this.router.navigate(['/workflows']);
      }, error => {
        console.error('Error updating workflow:', error);
      });

    } else {
      const newWorkflow = { ...formData, editedOn };

      this.workflowService.addWorkflow(newWorkflow).subscribe(() => {
        console.log("New workflow added successfully!");
        this.router.navigate(['/workflows']);
      }, error => {
        console.error('Error adding workflow:', error);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/workflows']); 
  }
}
