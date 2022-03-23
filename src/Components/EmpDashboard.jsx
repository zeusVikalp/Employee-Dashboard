import React from "react"

function EmpDashboard (){
    const[inputName,setInputName] = React.useState("")
    const[inputDepartment,setInputDepartment] = React.useState("")
    const[inputGender,setInputGender] = React.useState("")
    const[inputRole,setInputRole] = React.useState("")
    const[inputSalary,setInputSalary] = React.useState("")
    const[Props,setProps] = React.useState([])
    


    React.useEffect(()=>{
        getProps()
    },[]);

    React.useEffect( () => {
        sortAsc()
    },[Props.length])

    const getProps = () =>{
        fetch(`http://localhost:3001/Props`)
        .then( (res) =>res.json())
        .then( (res) =>setProps(res))
        .catch( (err) => console.log(err))
            
    }

    const sortAsc = () => {
        fetch(`http://localhost:3001/Props?_sort=${Props.Salary}&_order=asc`)
        .then((res) => res.json())
        .then( (res) => {
            console.log(res)
            // setProps(res)
            .catch( (err) => console.log(err))

        })
    }
    

    const handelAdd = () =>{
        const payload = {
            Name:inputName,
            Department:inputDepartment,
            Gender:inputGender,
            Role:inputRole,
            Salary:inputSalary,
            
        }
        const payloadjson = JSON.stringify(payload)

        fetch(`http://localhost:3001/Props`, {
            method:"POST",
            body:payloadjson,
            headers:{
                "content-type":"application/json"
            }
        }).then( (res) =>{
            getProps()
        })
    }
    return(
        
      <div>
          <input  placeholder="Name" value={inputName} onChange = { (e)=>setInputName(e.target.value) }/>
          <input  placeholder="Department" value={inputDepartment} onChange = { (e)=>setInputDepartment(e.target.value) }/>
          <input  placeholder="Gender" value={inputGender} onChange = { (e)=>setInputGender(e.target.value) }/>
          <input  placeholder="Role" value={inputRole} onChange = { (e)=>setInputRole(e.target.value) }/>
          <input  placeholder="Salary" value={inputSalary} onChange = { (e)=>setInputSalary(e.target.value) }/>

          <button onClick={handelAdd}>ADD EMPLOYEE</button>
          <br /><br /><br /><br />
          <button onClick={handelAdd}>Show All Departments</button>
          <br /><br /><br />
          <button onClick={ sortAsc()}>SORT</button>


          {Props.map( (item) =>{
              return <div>
                  {"Name :" + item.Name} <br />
                  {"Department:" + item.Department} <br />
                  {"Gender:" + item.Gender} <br />
                  {"Role:"+item.Role} <br />
                  {"Salary:" + item.Salary} <br />

                  <br />
              </div>
          })}
         
      </div>
     
    )
}
export {EmpDashboard}
