import { Component , inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../model/class/Client';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { MyButtonComponent } from "../../resusableComponent/my-button/my-button.component";

@Component({
  selector: 'app-client',
  imports: [FormsModule, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  ngOnInit(): void {
    this.loadClient();
  }

  clientObj:Client=new Client();
  clientList:Client[]=[];
  clientService=inject(ClientService);

  loadClient(){
    this.clientService.getAllClients().subscribe((res:APIResponseModel)=>{
      this.clientList=res.data;
      console.log(this.clientList);
    })
  }

  onSaveClient(){
    this.clientService.addUpdateClient(this.clientObj).subscribe((res:APIResponseModel)=>{
      if(res.result){
        alert("Client Created Successfully");
        this.loadClient();
        this.clientObj=new Client();
      }
      else{
        alert(res.message);
      }
    })
  }
  
  OnDelete(id:number){
    const isDelete= confirm("Are you sure you want to delete");
    if(isDelete){
      this.clientService.deleteClientById(id).subscribe((res:APIResponseModel)=>{
        if(res.result){
          alert("Client Deleted Successfully");
          this.loadClient();
          this.clientObj=new Client();
        }
        else{
          alert(res.message);
        }
      })
    }
  }

  OnEdit(obj:Client){
    this.clientObj=obj;
  }


}
