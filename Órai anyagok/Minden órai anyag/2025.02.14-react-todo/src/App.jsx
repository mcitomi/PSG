import { useState } from "react"

function TodoCard({todo, removeTodo}) {
    return <div>
        <h3>{todo}</h3>
        <button onClick={() => removeTodo(false, todo)}>Törlés</button>
    </div>
}

function $(id) {
    return document.getElementById(id);
}

export default () => {
    const [todoList, setTodo] = useState([
        "Rajmi hazaengedése",
        "Berdó hajának levágása",
        "Milán szeretőjének kiderítése"
    ]);

    function editToDoList(isAdd, todo) {
        if(isAdd) {
            let _todoList = [...todoList];
            _todoList.push(todo);

            setTodo(_todoList);
        } else {
            let _todoList = [...todoList];
            _todoList.splice(_todoList.indexOf(todo), 1);

            setTodo(_todoList);
        }
    }

    return <>
        <input id="todoInput" type="text"></input>
        <button onClick={() => {
            editToDoList(true, $("todoInput").value);
            $("todoInput").value = "";
        }}>
            Teendő hozzáadása
        </button>

        <h2>Teendők:</h2>
        {
            todoList.map((todo, i) => {
                return <TodoCard key={i} todo={todo} removeTodo={editToDoList}/>
            })
        }
    </>
}