import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo,setTodo]=useState("") // input text
  const [todos,setTodos]=useState([])  // array of todos
  //const [finished,setFinished]=useState([])
  const [showFinished,setshowFinished]=useState(false)

  useEffect(()=>{
    let todoString=localStorage.getItem("todos")
    if(todoString)
    {
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
  },[])

  const saveToLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
    saveToLS()
  }

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    }); 
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete=(e,id)=>{
    //console.log(`${id}`);
    // let index=todos.findIndex(item=>{
    //   return item.id===id;
    // })
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    }); 
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    //console.log(todos);
    saveToLS()
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckBox=(e)=>{
    //console.log(e,e.target);
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    //console.log(index);
    let newTodos=[...todos]; //new array
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
    //console.log(newTodos,todos);
  }

  return (
    <>
      <Navbar />
      <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-sky-900 min-h-[80vh] md:w-3/4'>
        <div className='flex bg-gray-200 p-2 font-bold rounded-md justify-center text-black items-center text-3xl'>
          <h1>&lt;MY-Time&gt; - MY Task Manager</h1>
        </div>
        <div className='addTodo my-5'>
          <h1 className='text-lg font-bold text-white mb-4 underline'>Add a Task:</h1>
          <div className='flex'>
            <input onChange={handleChange} value={todo} type='text' placeholder='Add your tasks' className='w-1/2 rounded-full m-0.5 pl-3'/>
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-black text-white hover:bg-white hover:text-black p-2 md:w-[10%] text-sm rounded-full mx-4 font-bold disabled:bg-black disabled:text-white disabled:hover:bg-white disabled:hover:text-black cursor-pointer'>Add</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
        <label className='mx-2 text-white' htmlFor="show">Show Finished</label> 
        <div className='h-[1.52px] bg-black w-[100%] mx-auto mb-2'></div>
        <h1 className='text-lg font-bold text-white mb-3 underline'>Your ToDo's:</h1>
        <div className='todos'>
          {todos.length===0 && <div className='font-bold text-white ml-3'>No Tasks To Display</div>}
          {todos.map(item=>{
            return (showFinished || !item.isCompleted) &&
                <div key={item.id} className={"todo flex justify-between my-4 md:w-1/2"}>
                  <div className='flex text-white my-1 gap-5'>
                    <input onChange={handleCheckBox} type='checkbox' checked={item.isCompleted} name={item.id} id='' />
                    <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                  </div>
                  {/* <div className='text text-white'>{todo}</div> */}
                  <div className='flex buttons h-full'>
                    <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-black text-white hover:bg-white hover:text-black p-2.5 text-sm rounded-md mx-2 font-bold'><FaEdit /></button>
                    <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-black text-white hover:bg-white hover:text-black p-2.5 text-sm rounded-md mx-2 font-bold'><MdDelete /></button>
                  </div>
                </div>
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
