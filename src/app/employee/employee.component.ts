import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpserviceService } from '../empservice.service';

export  class emp{
  id!:any;
  emp_name:any;
  gender:any;
  dept:any;
  salary:any;
  mobile:any;
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  isEdit:boolean=false;
  emplist:emp[]=[];
  one:emp=new emp();
  onee:any;
  employee:emp=new emp();
  constructor(private employeedetails:EmpserviceService) { }
  ngOnInit(): void {
    this.getAll();
  } 
  onSubmit(f:NgForm):void
  {

    if(!this.isEdit)
    {
      delete f.value.id;
      this.employeedetails.createemp(f.value).subscribe(data=>
        {
          console.log(data);
          f.resetForm();
          this.getAll();
        })
      alert("New Employee Added!");
    }
    else
    {
      
      this.employeedetails.Updateemp(f.value).subscribe(data=>{
        console.log(data);
        f.resetForm();
        this.isEdit=false;
        this.getAll();
      })
      alert("Details Updated!")
    }

  }
  getAll():void
  {
    this.employeedetails.GetAllemp()
    .subscribe(data=>{
      this.emplist=data;
    })
     
  }
    
 edit(data:emp):void
  {
    this.isEdit=true;
    this.employeedetails.GetOneemp(data.id)
    .subscribe(dt=>
      {
        console.log(dt);
        this.employee=dt;
        this.getAll();
      }) 
    
  }
  delete(data:emp):void{
    const confirm=window.confirm("Sure you want to delete?")
    if(confirm)
    {
      this.employeedetails.Deleteemp(data.id)
      .subscribe((dt:any)=>{
        console.log(dt);
        this.getAll();
      })
    }
    
  }
  search(data:any):void
  {
    this.employeedetails.GetOneemp(data)
    .subscribe(dt=>
      {
        console.log(dt);
        console.log("success");
        this.one=dt;
        //this.getAll();
      }) 
    
  }
 deleteall():void
  {
    const confirm=window.confirm("Sure you want to delete?")
    if(confirm){
    this.employeedetails.Deleteall()
    .subscribe(data=>{
      this.emplist=data;
      this.getAll();
    })
   
  }
  }

}
