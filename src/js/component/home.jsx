import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [task, setTask] = useState({
    label: "",
    is_done: false
  });

  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const eventKey = (e) => {
    if (e.key === "Enter" && task.label != "") {
      addNewTask();
    }
  }

  async function addNewTask() {
    const response = await fetch("https://playground.4geeks.com/todo/todos/GustavoColombia", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        'Content-type': 'application/json'
      }
    })
    if (response.ok) {
      const postData = await response.json()
      console.log(postData)
      setTasks([ ...tasks, postData] )
      setTask({label:"",is_done:false})
    }
  }
  async function createUser() {
    const response = await fetch("https://playground.4geeks.com/todo/users/GustavoColombia", {
      method: "POST",
    
    })
    if (response.ok) {
      const postData = await response.json()
      console.log(postData)
    }
  }
  
  async function getInfoTask() {
    try {
      const response = await fetch("https://playground.4geeks.com/todo/users/GustavoColombia");
      const infoData = await response.json();
      if (response.ok){
        console.log(infoData)
        setTasks(infoData.todos);
      }
    
    }
    catch (e) {
      console.log(e);
     
    }
  }
  async function removeTask(id) {
    console.log(id)
    try {
      const response = await fetch("https://playground.4geeks.com/todo/todos/"+id, {method: "DELETE"});
      const infoData = await response 
      if (response.ok){
        console.log(infoData)
        const newArray = tasks.filter(item => item.id != id)
        setTasks(newArray);
      }
    
    }
    catch (e) {
      console.log(e);
     
    }
  }

  useEffect(() => {
    createUser()
    getInfoTask()
  }, [])
 console.log(tasks)
  return (
     <div className="card mb-3 mt-5 text-center">
    <h1>TodoList</h1>
    <div className="card-header d-flex">
      <input
        type="text"
        name="label"
        className="form-control"
        value={task.label}
        onChange={handleChange}
        onKeyDown={(event) => eventKey(event)}
      />
    </div>
    <div className="card-body">
      <ul className="list-group">
        {tasks.length > 0 ? tasks.map((taskElement) => 
          (
            <li
              key={taskElement.id}
              className="list-group-item d-flex justify-content-between" aria-current="true">
              {taskElement.label}
              <button className="btn btn-danger" onClick={()=> removeTask(taskElement.id)}>X</button>
            </li>
          )): 

        <li
         className="list-group-item active d-flex justify-content-between" aria-current="true">
         no hay tareas
      </li>
        }
      </ul>
      <p>{tasks.length} tasks left.</p>
    </div>
  </div>



  );

}

export default Home
