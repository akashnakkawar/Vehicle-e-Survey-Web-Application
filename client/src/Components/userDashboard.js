import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import apis from './api'
export default function UserDashboard(props) {
    const [questions,setQuestions] = useState('')
    const [change,setChange] = useState(true)
    const [status,setStatus] = useState(false)
    const [list,setList] = useState([])
    const [isPresent,setIsPresent] = useState(false)
    const getData=async()=>{
        await apis.getQuestions()
                  .then(res=>{setQuestions(res.data.data)                     
                  })
                  .catch(e=>console.log(e))
        const email = props.info.email
        const password = props.info.password
        await apis.userLogin({email,password})
                  .then(res=>{
                      setList(res.data.info.questions)
                  })
                  .catch(e=>console.log(e))
    }
    const [id,setId] = useState(null)
    const [options,setOptions] = useState(null)
    const [key, setKey] = useState(null)
    const handleChanges =(key)=>{
           setKey(key)
           let o = [...options]
           setOptions(o)
        

    }
    const updateList=async ()=>{
        const data=id
       
        const i = props.info._id
        await apis.userUpdate({i,data})
                  .then(setChange(!change))
                  .catch(e=>console.log(e))
    }
    const [isSelected,setisSelected] = useState(false)
    const handleUpdate=async (e)=>{
        e.preventDefault()
        if(key==null){
            setStatus(true)
            setisSelected('Please select one option')
            setTimeout(()=>{setStatus(false)},2000)
        }
        else{
        let o = [...options]
        o[key].value++
        setOptions(o)
        const payload = {id,options}
       
            await apis.updateOptions(payload).then((res)=>{
                setStatus(true)
                setisSelected('submitted successfully.')
                updateList();
                setTimeout(()=>{
                    setStatus(null)
                    setChange(!change)
                    setisSelected('')
                    setKey(null)
                    setOptions('')
                    
                    
                },2000)
                getData()
            })
            .catch(e=>console.log('error happened',e))
        }
    }
   useEffect(()=>{getData()},[change])
    if(!props.isLogin){
        return(
            <div className="container m-5">
                <p>session has been expaired. Please login to continue.. <Link to='/login'>Login</Link></p>
            </div>
        )
    }
    else if(status){
        return (<div class="alert alert-danger m-5 p-5" role="alert">
             {isSelected}
            </div>)
    }
    else
    {
        return (
        <div className="container m-5">
            <p>Hello, {props.info.name}</p>
            <div className="edit question">
            
            <select class="form-select" aria-label="Default select example" onChange={(e)=>{setId(questions[e.target.value].id)
                e.target.value!=='root'? setOptions([...questions[e.target.value].options]):setOptions([])
                setIsPresent(false)

                let i = questions[e.target.value].id
               
                list.forEach(element => {
        
                    if(parseInt(element)===i)
                            {setIsPresent(true)
                            }
                });
               
                 }}>
            <option value="root" selected>Please select question to edit options</option>
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
            
              <div class="form-check" onChange={()=>handleChanges(key)}>
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label class="form-check-label" for="flexRadioDefault1">
              {options[key].key}
              </label>
            </div>
              )
            })}
            </div>
            }
           
            <button class="btn btn-success my-5"  onClick={handleUpdate} disabled={isPresent}>Submit</button>
            
            {isPresent?<div class="alert alert-danger" role="alert">
             you already submitted responce to this question. You can't change the option.
            </div>:<p></p>}
            
        </div>
        </div>
    )}
}
