
import './App.css';
import React, { useState } from 'react';
import JsonView from './jsonView';

function App() {
  const [formData, setFormData] = useState({name:'',desgination:'',contactDetails:[{type:'',phoneno:''}],skills:[''],dob:''});
  const [employeeDetails,setEmployeeDetails] = useState([])
  const [viewData,setViewData] =  useState(false)
  var month=new Array();
  month[0]="Jan";
  month[1]="Feb";
  month[2]="Mar";
  month[3]="Apr";
  month[4]="May";
  month[5]="Jun";
  month[6]="Jul";
  month[7]="Aug";
  month[8]="Sep";
  month[9]="Oct";
  month[10]="Nov";
  month[11]="Dec";
  const handleAdd = (e,type) => {
     e.preventDefault();
     if(type=="contact"){
     var {contactDetails} = formData;
     contactDetails = contactDetails.concat({type:'',phoneno:''});
    setFormData({...formData, contactDetails});
     }
     if(type=="skills")
     {
       var {skills} = formData;
     skills = skills.concat('');
    setFormData({...formData, skills});
     }
  };
  const handleRemove = (e,type,index) => {
     e.preventDefault();
     if(type=="contact"){
     var {contactDetails} = formData;
     contactDetails.splice(index,1);
    setFormData({...formData, contactDetails});
     }
     if(type=="skills")
     {
       var {skills} = formData;
   skills.splice(index,1)
    setFormData({...formData, skills});
     }
  };
  const handleInput = (i,e,type)=>{
  if(type=='contact'){
   let contactDetails = formData.contactDetails;
   contactDetails[i][e.target.name] = e.target.value;
   setFormData({...formData,contactDetails:contactDetails})
  }
  if(type=='skills')
  {
    let {skills} = formData;
    skills[i] = e.target.value;
    setFormData({...formData,skills:skills})
  }
   
  }

  const addEmployeeDetails = (e,type)=>{
    e.preventDefault();
    let temp = [];
    if(formData.dob!='')
    formData.dob = (new Date(formData.dob).getDate()+"-"+month[new Date(formData.dob).getMonth()]+"-"+ new Date(formData.dob).getFullYear())
    formData.contactDetails = formData.contactDetails.filter((x)=>{return(x.type || x.phoneno)})
    formData.skills = formData.skills.filter((x)=>x!="")
    let details = [...employeeDetails];
    details.push(formData)
    setEmployeeDetails(details)
    alert('Details added succesfully. Please click view data to view the details entered')
    setFormData({name:'',desgination:'',contactDetails:[{type:'',phoneno:''}],skills:[''],dob:''})
  }
  return (
    <div className="App">
      <div className="font"><b>Employee Data</b></div>
      <div className="border">
        <form onSubmit={(e)=>addEmployeeDetails(e,'tyh')}>
          <div className="field"> 
          <label className="label">Name :     </label>
         <input type="text" value={formData.name} pattern="^(?!\s)[ A-Za-z0-9_@.,/#&+-]+" title="Accepts following only A-Za-z0-9_@.,/#&+- .No spaces are allowed at the first " required onChange={(e)=>{setFormData({...formData,name:e.target.value})}}/>
          </div>
          <div className="field">
          <label className="label">Designation :     </label>
           <input type="text" value={formData.desgination} pattern="^(?!\s)[ A-Za-z0-9_@.,/#&+-]+" title="Accepts following only A-Za-z0-9_@.,/#&+- .No spaces are allowed at the first" required onChange={(e)=>{setFormData({...formData,desgination:e.target.value})}}/>
           </div>
           <div className="field">
           {
             formData.contactDetails.map((x,i)=>{
               return(i<4?
                <div>
           {i==0?<label className="label">Contact Details :     </label>:''}
           {i==0?<div style={{display:'inline'}}>
           <input type="text" name="type" value={formData.contactDetails[i].type} placeholder="Type" onChange={(e)=>handleInput(i,e,'contact')} pattern="^[a-zA-Z]+$" title="Enter the type of number(Only Alphabets)" required/>
           <input style={{marginLeft:'15vw'}} value={formData.contactDetails[i].phoneno} placeholder="PhoneNo"  pattern="[0-9]{10}" title="10 Digit Contact Number" name="phoneno"  type="text" onChange={(e)=>handleInput(i,e,'contact')} required/>
           </div>:
           <div style={{display:'inline'}}>
           <input type="text" name="type" value={formData.contactDetails[i].type} placeholder="Type" onChange={(e)=>handleInput(i,e,'contact')} pattern="^[a-zA-Z]+$" title="Enter the type of number(Only Alphabets)"/>
           <input style={{marginLeft:'15vw'}} value={formData.contactDetails[i].phoneno} placeholder="PhoneNo"  pattern="[0-9]{10}" title="10 Digit Contact Number" name="phoneno"  type="text" onChange={(e)=>handleInput(i,e,'contact')}/>
           </div>}
           {i!=0?<button style={{left:'69vw',position:'absolute'}} onClick={(e)=>handleRemove(e,'contact',i)}>-</button>:''}
           {i==formData.contactDetails.length-1?<button style={{left:'72vw',position:'absolute'}} onClick={(e)=>handleAdd(e,'contact')}>+</button>:''}<br></br>
            </div> :'')})
           
           }
           </div>
            <div className="field">
           {formData.skills.map((x,i)=>{return(
           <div>
          {i==0?<label className="label">Skills :     </label>:''}
           <input type="text" size="9" style={{width:'7vw'}} value={formData.skills[i]} onChange={(e)=>handleInput(i,e,'skills')}/>
           {i!=0?<button style={{left:'50vw',position:'absolute'}} onClick={(e)=>handleRemove(e,'skills',i)}>-</button>:''}
           {i==formData.skills.length-1?<button style={{left:'55vw',position:'absolute'}} onClick={(e)=>handleAdd(e,'skills')}>+</button>:''}<br></br>
           </div>
           )})
          
           }
           </div>
           <div className="field">
          <label className="label">Date of Birth :     </label>
           <input type="date" value={formData.dob} onChange={(e)=>{setFormData({...formData,dob:e.target.value})}}/>
           </div>
           <input  style={{marginLeft:'5vw',marginTop:'0.8vw',border:'none', height:'25px',width:'130px',backgroundColor:'rgb(209, 192, 192)'}} type="submit" value="Add Employees"/>
        </form>
      </div>
      
      <button onClick={()=>{setViewData(true)}} style={{marginLeft:'45vw',marginTop:'50px',width:'130px',border:'none',height:'25px',backgroundColor:'rgb(209, 192, 192)'}} >View Data</button>
      {viewData?<JsonView details={employeeDetails}/>:''}
    </div>
  );
}

export default App;
