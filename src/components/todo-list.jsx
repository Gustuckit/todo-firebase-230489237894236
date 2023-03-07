import ToDo from "./todo"
import React, { useState, useEffect } from 'react'
import { addToDoDB, updateToDoDB, fetchFromDB, deleteToDoDB } from '../db/operations'

import '../css/todo-list.css'

function ToDoList() {

    const [input, setInput] = useState('') // input is the value of the input field
    const [todos, setToDo] = useState([]) // todos is the array of todos

    const handleChange = (e) => {
        setInput(e.target.value) // set input to the value of the input field
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        addToDo()

        setInput('') // reset input field
    }

    const addToDo = () => {
        if (input == '') {
            return // if input is empty, do nothing
        }

        const newToDo = { // create a new todo object
            text: input,
            completed: false,
            date: new Date(),
        }

        addToDoDB(newToDo) // add new todo to database
        setToDo([...todos, newToDo]) // add new todo to todos array

        // Fetch todos from database to prevent error with undefined id
        fetchFromDB().then((newToDo) => { // fetch todos from database
            setToDo(newToDo) // set todos to the todos from the database
        })
    }

    const deleteToDo = (id) => {
        const remainingTodos = todos.filter(item => {
            return id !== item.id // return all todos except the one with the id that was passed in
        })

        deleteToDoDB(id) // delete todo with the id that was passed in from the database
        setToDo(remainingTodos) // set todos to the remaining todos

        fetchFromDB().then((newToDo) => { // fetch todos from database
            setToDo(newToDo) // set todos to the todos from the database
        })
    }

    useEffect(() => {
        fetchFromDB().then((newToDo) => { // fetch todos from database
            setToDo(newToDo) // set todos to the todos from the database
        })
    }, [/* RUN ON LOAD */])

    const editToDo = (id, newText) => {
        const updateToDo = todos.map(item => {
            if (id === item.id) {
                updateToDoDB(id, { ...item, text: newText }) // update todo with the id that was passed in in the database
                return { ...item, text: newText } // return the todo with the updated text
            }
            return item // return the todo
        })

        fetchFromDB().then((newToDo) => { // fetch todos from database
            setToDo(newToDo) // set todos to the todos from the database
        })
    }

    /* 
     */
    const completeFunc = (id) => {
        const updateToDo = todos.map(item => {
            if (id === item.id) {
                if (item.completed == false) {
                    updateToDoDB(id, { ...item, completed: true }) // update todo with the id that was passed in in the database
                    return { ...item, completed: true } // return the todo with the updated text
                } else if (item.completed == true) {
                    updateToDoDB(id, { ...item, completed: false }) // update todo with the id that was passed in in the database
                    return { ...item, completed: true } // return the todo with the updated text
                }
            }
            return item // return the todo
        })

        fetchFromDB().then((newToDo) => { // fetch todos from database
            setToDo(newToDo) // set todos to the todos from the database
        })
    }
    /* 
     */

    return (
        <div className='container'>
            <div className="main">
                <div className="header">
                    <h1>My ToDo's</h1>
                    <form onSubmit={handleSubmit}>
                        {/* <label htmlFor=''>Create ToDo! </label> */}
                        <input type='text' onChange={handleChange} value={input} placeholder="add todo here..." />
                        <button type='submit'>ADD</button>
                    </form>
                </div>
                <div className="todos">
                    <ul className="item">
                        {todos.map((item) => {
                            return <ToDo
                                key={item.id}
                                id={item.id}
                                text={item.text}
                                // Handling Completed
                                completed={item.completed}
                                completeFunc={completeFunc}
                                // Handling Edit
                                editToDo={editToDo}
                                // Handling Delete
                                deleteToDo={deleteToDo}
                            />
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ToDoList;