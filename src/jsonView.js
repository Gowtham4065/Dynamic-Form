import React, { Component } from 'react'
import './App.css';

class jsonView extends Component {
    constructor(props)
    {
      super(props)
    }
    render() {
        return (
            <div>
            <div className="display">
               {this.props.details.map((data,i)=>{
                   return (<div className='data'>
                       Employee#{i+1}<br></br>
                       Name:&emsp;&emsp;&emsp;&emsp;{data.name}<br></br>
                       Desgination:&emsp; {data.desgination}<br></br>
                       {data.contactDetails.map((value,i)=>{
                        return(
                            <div>
                               {i==0?<div>Contacts:&emsp;&emsp;&ensp;&nbsp;{value.type} - {value.phoneno}</div>
                               :<div>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp;{value.type} - {value.phoneno}</div>}
                           </div>
                        )
                       })}
                        Skills: &emsp;&emsp;&emsp;&emsp;{
                           data.skills.map((value,i)=>{return(<div style={{display:'inline'}}>{i<data.skills.length-1 && value!=""?(value+','):value}</div>)})
                       }
                       <br></br>
                       D0B:&emsp;&emsp;&emsp;&emsp;&ensp;{data.dob}
                       </div>);
               })}
               
            </div>
            
            <a className="button"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(this.props.details,null, '\t')
            )}`}
            download="filename.json"
          >
            {`Download Json`}
          </a>
          </div>
        )
    }
}

export default jsonView
