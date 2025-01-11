import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, ClientProject, Employee } from '../../model/interface/role';
import { Client } from '../../model/class/Client';
import { DatePipe } from '@angular/common';
import { AlertComponent } from "../constant/alert/alert.component";

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit{

  clientService = inject(ClientService);

  employeeList:Employee[]=[];
  clientList:Client[]=[];
  projectList = signal<ClientProject[]>([]);

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("",[Validators.required,Validators.minLength(4)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking: new FormControl(0),
    projectCost: new FormControl(0),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    clientId: new FormControl(""),
  })

  ngOnInit(): void {
      this.getAllClient();
      this.getAllEmployee();
      this.getAllClientProject();
    }

    getAllEmployee(){
      this.clientService.getAllEmployee().subscribe((result:APIResponseModel)=>{
        this.employeeList=result.data;
      })
    }

    getAllClient(){
      this.clientService.getAllClients().subscribe((res:APIResponseModel)=>{
        this.clientList=res.data;
        console.log(this.clientList);
      })
    }

    getAllClientProject(){
      this.clientService.getAllClientProject().subscribe((res:APIResponseModel)=>{
        this.projectList.set(res.data);
        console.log(this.projectList);
      })
    }

    OnSaveProject(){
      const formValue = this.projectForm.value;
      this.clientService.addUpdateClientProject(formValue).subscribe((res:APIResponseModel)=>{
        if(res.result){
          alert("Project created successfully")
        }
        else{
          alert(res.message)
        }
      })
    }

}
