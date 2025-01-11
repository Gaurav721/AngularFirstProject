import { Component, inject ,OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponseModel } from '../../model/interface/role';
import { IDesignation } from '../../model/interface/designation';

@Component({
  selector: 'app-designation',
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit{

  designationList:IDesignation[]=[];
  isLoader:boolean=true;

  ngOnInit(): void {
    this.masterService.getDesignations().subscribe((result:APIResponseModel)=>{
      this.designationList=result.data;
      this.isLoader=false;
    },error=>{
      alert("API error");
      this.isLoader=false;
    })
  }

  masterService = inject(MasterService);

}
