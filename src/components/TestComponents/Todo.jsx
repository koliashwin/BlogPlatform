import React, { useEffect, useState } from 'react'
import './Test.css'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const Todo = () => {
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState([]);

    const addTodo = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                todo: todo,
            });
            fetchPost();
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error)
        }
    }

    const deletePost = async (id) => {
        await deleteDoc(doc(db, 'todos', id));
        setTodo("");
    }

    const fetchPost = async () =>{
        await getDocs(collection(db, 'todos'))
            .then((querySnapshot) =>{
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id}));
                setTodoList(newData);
            })
    }

    useEffect(() => {
        fetchPost();
    },[])

    return (
        <section className='todo-container'>
            <div className='todo'>
                <h1 className='header'>
                    Todo-App updated by prajwal
                </h1>
            </div>
            <div>
                <input type="text"
                    placeholder='what to do ?'
                    onChange={(e) => setTodo(e.target.value)}
                />
            </div>
            <div className='btn-container'>
                <button
                    type='submit'
                    className='btn'
                    onClick={addTodo}
                >
                    Submit
                </button>
            </div>
            <div className='todo-content'>
                {
                    todoList?.map((todo, i) =>(
                        <p key={i}>
                            {todo.todo}
                            <button onClick={deletePost}>delete</button>
                        </p>
                        
                    ))
                }
            </div>
        </section>
    )
}

export default Todo
