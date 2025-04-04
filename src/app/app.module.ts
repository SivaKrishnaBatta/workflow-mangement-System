import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
// Import Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';
import { MatCardModule } from '@angular/material/card';
import { LoginPageComponent } from './login-page/login-page.component';
@NgModule({
  declarations: [
    AppComponent,
    WorkflowComponent,
    CreateWorkflowComponent,
    LoginPageComponent // ✅ Ensure it is only declared once
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // ✅ Required for Angular Material
    HttpClientModule, // ✅ Required for HTTP requests
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    // ✅ Angular Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,  // ✅ For modal dialogs
    MatSnackBarModule // ✅ For notifications/snackbars
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
