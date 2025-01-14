import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService, Employee } from './employee.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  employeeForm: FormGroup;
  isEditing = false;
  currentEmployeeId?: number;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees(0, 5).subscribe((data) => {
      this.employees = data.content;
    });
  }

  addEmployee(): void {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      this.employeeService.addEmployee(newEmployee).subscribe(() => {
        this.loadEmployees();
        this.employeeForm.reset();
      });
    }
  }

  editEmployee(employee: Employee): void {
    this.isEditing = true;
    this.currentEmployeeId = employee.id;
    this.employeeForm.patchValue(employee);
  }

  updateEmployee(): void {
    if (this.employeeForm.valid && this.currentEmployeeId !== undefined) {
      const updatedEmployee: Employee = this.employeeForm.value;
      this.employeeService.updateEmployee(this.currentEmployeeId, updatedEmployee).subscribe(() => {
        this.loadEmployees();
        this.cancelEditing();
      });
    }
  }

  deleteEmployee(id?: number): void {
    if (id !== undefined) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }
  

  cancelEditing(): void {
    this.isEditing = false;
    this.currentEmployeeId = undefined;
    this.employeeForm.reset();
  }
}
