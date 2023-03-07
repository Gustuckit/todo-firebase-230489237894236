import React, { useState } from "react"

import '../css/todo.css'

// function ToDo(props) {

//     const [input, setInput] = useState('') // input is the value of the input field

//     const handleChange = (e) => {
//         e.preventDefault()

//         setInput(e.target.value) // set input to the value of the input field
//     }

//     // if the todo that is being rendered is completed, add the 'completed' class to the li

//     return (
//         <div>
//             <li>
//                 <form>
//                     {props.text}
//                     {/* 

//                     */}
//                     <div>
//                         <label> EDIT: </label>
//                         <input
//                             type='text'
//                             id={props.id}
//                             onChange={handleChange}
//                             value={input}
//                         />
//                     </div>
//                     {/* 

//                     */}
//                     <div className='btn-group'>
//                         <button type='button' onClick={() => props.deleteToDo(props.id)}>DELETE</button>
//                         {/* 

//                     */}
//                         <button type='button' onClick={() => {
//                             if (input == '') {
//                                 return
//                             }
//                             props.editToDo(props.id, input)
//                             setInput('')
//                         }}>EDIT</button>
//                         {/* 

//                     */}
//                         <button type='button' onClick={() => props.completeToDo(props.id)}>COMPLETE</button>
//                     </div>
//                 </form>
//             </li>
//         </div>
//     )
// }

function ToDo(props) {

    const [input, setInput] = useState('') // input is the value of the input field

    const handleChange = (e) => {
        e.preventDefault()

        setInput(e.target.value) // set input to the value of the input field
    }

    // if the todo that is being rendered is completed, add a 'completed' class
    return (
        <div>
            <li className={props.completed ? 'completed' : ''}>
                <form>
                    <div className="todo-text">
                        {props.text}
                    </div>
                    {/* 
                    
                    */}
                    <div>
                        {/* <label> EDIT: </label> */}
                        <input
                            className="edit"
                            type='text'
                            id={props.id}
                            onChange={handleChange}
                            value={input}
                        />

                        <button type='button' onClick={() => {
                            if (input == '') {
                                return
                            }
                            props.editToDo(props.id, input)
                            setInput('')
                        }}>EDIT</button>

                    </div>
                    {/* 
                    
                    */}
                    <div className='btn-group'>
                        <button type='button' onClick={() => props.deleteToDo(props.id)}>DELETE</button>

                        {/* <button type='button' onClick={() => {
                            if (input == '') {
                                return
                            }
                            props.editToDo(props.id, input)
                            setInput('')
                        }}>EDIT</button> */}

                        <button type='button' onClick={() => props.completeFunc(props.id)}>TOGGLE COMPLETE</button>
                    </div>
                </form>
            </li>
        </div>
    )
}

export default ToDo;