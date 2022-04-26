import React, { useState,useEffect } from 'react'
import { BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom'
import apis from './api'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'




function Add(){

    const [question,setQuestion] = useState('')
    const [option,setOption] = useState('')
    const [opt,setopt] = useState([])
    const handleopt=()=>{
        let o =[...opt,option]
        setopt(o)
        setOption('')
    }
    const [status,setStatus] = useState(null)
    const handleSubmit=async(e)=>{
        e.preventDefault()
       
        // let options = opt.reduce((a, v) => ({ ...a, ['key']:v,['value']:0}), {})
        let options = opt.map(i=>{
            return {'key':i,value:0}
        })

        const payload = {question,options}
        await apis.insertQuestion(payload)
                  .then((res)=>{
                      res.status===201?setStatus(true):setStatus(false)
                      setOption('')
                      setQuestion('')
                      setopt([])
                      setTimeout(()=>{setStatus(null)},2000)
                  })
                  .catch(e=>{
                      setStatus(false)
                      console.log('error',e)
                      
                      setTimeout(()=>{setStatus(null)},2000)
                  })
    }
    
    return(
       <div className='add container-fluid m-3'>
        <div className="row">
            <div className="col-8">
                <label>Enter question</label> <br/>
                <input type='text' className='form-control p-1 my-1' value={question} onChange={(e)=>setQuestion(e.target.value)} /> <br/> 
                <input type='text' className='form-control p-1 my-1' placeholder='enter option here' value={option} onChange={(e)=>setOption(e.target.value)} /> <br/>
                <button className="btn btn-dark" onClick={handleopt} >add option</button>
            </div>
            <div className="col-4">
                 <label>Added opttions are : </label> 
                 <ol>
                     {opt.map((option) => (
                         <li>{option}</li>
                     ))}
                 </ol>
            </div>
        </div>
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
                <button className="btn btn-success my-5" onClick={handleSubmit}>Add Question</button>

            </div>
            <div className="col-4"></div>
        </div>
        <div className="row">
            {status===null?<p></p>:status===true?<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Success!</strong> Question inserted in the database.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>:<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Error!</strong> something went wrong. Please try again later.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>}
        </div>
        <div className="row">
        <div class="alert alert-info" role="alert">
            First enter question and enter option and click on add option button <br/> 
            To submit question and options, click on Add Question
        </div>
        </div>
       </div>
    )
}
function Welcome(){
    return(
        <div className="add">
            <h4>Welcome to admin dashboard</h4>
        </div>
    )
}
const Delete=()=>{
    const [questions,setQuestions] = useState('')
    const [change,setChange] = useState(true)
    const [status,setStatus] = useState(null)
    const getData=async()=>{
        await apis.getQuestions()
                  .then(res=>{setQuestions(res.data.data)                     
                  })
                  .catch(e=>console.log(e))
    }
    const [id,setId] = useState(null)
    const [isSelected,setisSelected] = useState(false)
    const handleDelete=async (e)=>{
        e.preventDefault()
        
            await apis.deleteQuestion({id}).then((res)=>{
                setStatus(true)
                setisSelected(true)
                setTimeout(()=>{
                    setStatus(null)
                    setChange(!change)
                    setisSelected(false)
                    
                },2000)
            })
            .catch(e=>console.log('error happened'))
    }
   useEffect(()=>{getData()},[change])
   if(isSelected)return(
       status===true?<div class="alert alert-success" role="alert">
                        The selected question has been deleted
                    </div>:<div class="alert alert-danger" role="alert">
                            Error happened. Please try again later.
                        </div>
    )
    if(questions.length===0)
        return(
            <div class="alert alert-danger" role="alert">
            No question found. Please first add the question to delete it. 
        </div>  
        )
    return(
        <div className="delete">
            
            <select class="form-select" aria-label="Default select example" onChange={(e)=>setId(e.target.value)}>
            <option value="0" selected>Please select question to delete</option>
            {
                Object.keys(questions).map((key)=>{
                    return(
                     <option value={questions[key].id}>{questions[key].question}</option>
                    )
                   
                
                })
            }
           
            </select>
            <button class="btn btn-danger my-5" onClick={handleDelete}>Delete Question</button>
            
        </div>
    )
}
function Edit(){
    const [questions,setQuestions] = useState('')
    const [change,setChange] = useState(true)
    const [status,setStatus] = useState(null)
    const getData=async()=>{
        await apis.getQuestions()
                  .then(res=>{setQuestions(res.data.data)                     
                  })
                  .catch(e=>console.log(e))
    }
    const [id,setId] = useState(null)
    const [q,setQ] = useState('')
    const [isSelected,setisSelected] = useState(false)
    const [user, setUser] = useState(false)
    const handleUpdate=(e)=>{
        e.preventDefault()
        let sum =0
       
        Object.keys(questions).forEach(i=>{
           
            if(questions[i].id===parseInt(id)){
                
                questions[i].options.forEach(e=>{
                    sum+=e.value
                    
                })
               
            }
        })
        console.log('sum=',sum)
        if (sum===0)
            handleUpdate2()
        else{
            setUser(true)
            setTimeout(() => {
               setUser(false) 
            }, 2000);
        }
    }
    const handleUpdate2=async ()=>{
        
        const payload = {id,q}
            await apis.updateQuestion(payload).then((res)=>{
                setStatus(true)
                setisSelected(true)
                setTimeout(()=>{
                    setStatus(null)
                    setChange(!change)
                    setisSelected(false)
                    
                },2000)
                getData()
            })
            .catch(e=>console.log('error happened',e))
    }
   useEffect(()=>{getData()},[change])
   if(user){
    return(
        <div class="alert alert-danger" role="alert">
    The selected question has been answered by one or more users. <br/>
    You can't change the options or question text.
    </div>
    )
   }
   if(isSelected)return(
       status===true?<div class="alert alert-success" role="alert">
                        The selected question has been updated
                    </div>:<div class="alert alert-danger" role="alert">
                            Error happened. Please try again later.
                        </div>
    )
    if(questions.length===0)
        return(
            <div class="alert alert-danger" role="alert">
            No question found. Please first add the question to update it. 
        </div>  
        )
    return(
        <div className="edit question">
            
            <select class="form-select" aria-label="Default select example" onChange={(e)=>setId(e.target.value)}>
            <option value="0" selected>Please select question to update</option>
            {
                Object.keys(questions).map((key)=>{
                    return(
                     <option value={questions[key].id}>{questions[key].question}</option>
                    )
                   
                
                })
            }
           
            </select><br/>
            <label>Please re-enter the question in below field to update</label> <br/>
            <input type="text" onChange={(e)=>setQ(e.target.value)}></input> <br/>
            <button class="btn btn-success my-5" onClick={(e)=>handleUpdate(e)}>Update Question</button>
            
        </div>
    )
}

function EditOption(){
    const [questions,setQuestions] = useState('')
    const [change,setChange] = useState(true)
    const [status,setStatus] = useState(null)
    const getData=async()=>{
        await apis.getQuestions()
                  .then(res=>{setQuestions(res.data.data)                     
                  })
                  .catch(e=>console.log(e))
    }
    const [id,setId] = useState(null)
    const [options,setOptions] = useState(null)
    const handleChanges =(e,key)=>{
           let o = [...options]
           o[key].key=e.target.value
           setOptions(o)

    }
    const [isSelected,setisSelected] = useState(false)
    const [user, setUser] = useState(false)
    const handleUpdate=(e)=>{
        e.preventDefault()
        let sum =0
        options.forEach(e=>{
            sum+=e.value
        })
        if (sum===0)
            handleUpdate2()
        else{
            setUser(true)
            setTimeout(() => {
               setUser(false) 
            }, 2000);
        }
    }

    const handleUpdate2=async ()=>{
        const payload = {id,options}
        console.log(payload)
            await apis.updateOptions(payload).then((res)=>{
                console.log(res)
                setStatus(true)
                setisSelected(true)
                setTimeout(()=>{
                    setStatus(null)
                    setChange(!change)
                    setisSelected(false)
                    setOptions('')
                    
                },2000)
                getData()
            })
            .catch(e=>console.log('error happened',e))
    }
   useEffect(()=>{getData()},[change])
   if(user){
    return(
        <div class="alert alert-danger" role="alert">
    The selected question has been answered by one or more users. <br/>
    You can't change the options or question text.
    </div>
    )
   }
   if(isSelected)return(
       status===true?<div class="alert alert-success" role="alert">
                        The selected question has been updated
                    </div>:<div class="alert alert-danger" role="alert">
                            Error happened. Please try again later.
                        </div>
    )
    if(questions.length===0)
        return(
            <div class="alert alert-danger" role="alert">
            No question found. Please first add the question to update it. 
        </div>  
        )
    return(
        <div className="edit question">
            
            <select class="form-select" aria-label="Default select example" onChange={(e)=>{setId(questions[e.target.value].id)
                 setOptions([...questions[e.target.value].options])
                 }}>
            <option value="0" selected>Please select question to edit options</option>
            {
                Object.keys(questions).map((key)=>{
                    return(
                     <option value={key}>{questions[key].question}</option>
                    )
                   
                
                })
            }
            
           
            </select><br/>
            {id===null?<p></p>:
            <div className="options">
            <label htmlFor="option">Please edit the options below:</label> <br/>
            {Object.keys(options).map(key=>{
                return(
                    <div className="options">
              <input type='text' class="form-control p-1 my-2" value={options[key].key} onChange={(e)=>handleChanges(e,key)} /> 
              </div> )
            })}


            </div>
            }
           
            <button class="btn btn-success my-5" onClick={handleUpdate}>Update Option</button>
            
        </div>
    )
}

function Statistics(){
    const [questions,setQuestions] = useState('')
    const change = false
    const getData=async()=>{
        await apis.getQuestions()
                  .then(res=>{setQuestions(res.data.data)                     
                  })
                  .catch(e=>console.log(e))
    }
    const [id,setId] = useState(null)
    const [options,setOptions] = useState(null)
    const [labels,setLabels] = useState([])
    const [data,setData] = useState([])
    
    
    const handleChanges =(a)=>{
        let k = Object.keys(a)
        let label=[]
        let data=[]
        console.log(typeof(data))  
        k.forEach(i=>{
           
            label.push(a[i].key)
            data.push(a[i].value)
        })
        setLabels(label)
        setData(data)

    }
   
    
   useEffect(()=>{getData()},[change])
  
    if(questions.length===0)
        return(
            <div class="alert alert-danger" role="alert">
            No question found. Please first add the question to update it. 
        </div>  
        )
    return(
        <div className="edit question">
            <div className="container fluid">
               
                <div className="row">
                    
                    <div className="col-9">
                    <select class="form-select" aria-label="Default select example" onChange={(e)=>{setId(questions[e.target.value].id)
                 setOptions([...questions[e.target.value].options])
                 handleChanges([...questions[e.target.value].options])
                 }}>
            
            <option value="0" selected>Please select question to get details</option>
            {
                Object.keys(questions).map((key)=>{
                    return(
                     <option value={key}>{questions[key].question}</option>
                    )
                   
                
                })
            }
            
           
            </select><br/>
            {id===null?<p></p>:
                <div className="response">

                    <div className="row mb-5 p-2">
                        <h5>Total number of responses={data.reduce((a, b) => a + b, 0)}</h5>
                    </div>
                    <div className="row m-2">
                    <div className="col-4">
            
                <label htmlFor="option">Options with number of responses:</label> <br/>
            
           { Object.keys(options).map(key=>{
                return(
                    <div className="options">
                    <p>{options[key].key}:{options[key].value}</p>
              </div> )
            })}
            
            
            </div>
        
            <div className="col-8">
            
            <div className="graphs">
            <p>Graph for the selected question with response</p>
            <Bar
          
             data={
                {
                    labels: labels,
                    datasets: [{
                      label:'report',
                      data: data,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                      ],
                      borderWidth: 1
                    }]
                  }
             }
          options={{
            responsive: true,
            legend: {
                display: false
            },
            title: {
                display: false,
                text: 'Chart.js bar Chart'
            },
            animation: {
                animateScale: true
            },
            scales: {
                y: {
                    
                    min: 0,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
          }
          }
        />
            </div>
            </div>
           
                    </div>
                    
                </div>
            
            }
                    
                   
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
            
            
           
           
            
        </div>
    )
}
export default function CouncilDashboard(props) {
    if(!props.isLogin){
        return(
            <div className="container m-5">
                <p>session has been expaired. Please login to continue.. <Link to='/login'>Login</Link></p>
            </div>
        )
    }
    else
    return (
        <Router>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-3 ">
                    <ul class="list-group">
                    <li class="list-group-item">
                    <Link class="nav-link" to='/councilDashboard/add'>Add Question</Link>
                    </li>
                    <li class="list-group-item">
                    <Link class="nav-link" to='/councilDashboard/delete'>Delete Question</Link>
                    </li>
                    <li class="list-group-item">
                    <Link class="nav-link" to='/councilDashboard/edit'>Edit Question</Link>
                    </li>
                    <li class="list-group-item">
                    <Link class="nav-link" to='/councilDashboard/editoption'>Edit option</Link>
                    </li>
                    <li class="list-group-item">
                    <Link class="nav-link" to='/councilDashboard/statistics'>Statistics</Link>
                    </li>
                </ul>
                    </div>
                    <div className="col-9 p-5">
                    <Switch>
                        <Route exact path="/councilDashboard/">
                        <Welcome />
                        </Route>
                        <Route path="/councilDashboard/add">
                        <Add />
                        </Route>
                        <Route path="/councilDashboard/delete">
                        <Delete />
                        </Route>
                        <Route path="/councilDashboard/edit">
                        <Edit />
                        </Route>
                        <Route path="/councilDashboard/editoption">
                        <EditOption />
                        </Route>
                        <Route path="/councilDashboard/statistics">
                        <Statistics />
                        </Route>
                        
                        
                        
                    </Switch>
                    </div>
                </div>
            </div>
  </Router>
    )
}
