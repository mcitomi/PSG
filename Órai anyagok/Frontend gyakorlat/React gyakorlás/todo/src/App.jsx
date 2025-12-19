import React, { useState } from "react";

function TodoItem({ item, onRemove,  }) {
    return (
        <li>
            {item}
            <button onClick={onRemove} style={{ marginLeft: "10px" }}>
                Törlés
            </button>
        </li>
    );
}

export default function App() {
    const [todos, setTodos] = useState([
        "Backend elmélet javító",
        "Backend elmélet React tananyag",
        "Ferencváros megalázása Football Managerben",
        "Frontend elmélet tananyag"
    ]);

    function removeTodo(index) {
        let newTodos = [];
        for (let i = 0; i < todos.length; i++) {
            if (i !== index) {
                newTodos.push(todos[i]);
            }
        }
        setTodos(newTodos);
    }

    function addTodo(event) {
        event.preventDefault();
        let newTodos = todos.slice();
        newTodos.push(event.target.elements["newTodo"].value);
        setTodos(newTodos);
    }

    return (
        <>
            <h2>Teendők listája</h2>
            <form onSubmit={addTodo}>
                <input type="text" id="newTodo" />
                <button type="submit">Hozzáadás</button>
            </form>
            <ul>
                {todos.map((todo, index) => {
                    return <TodoItem
                        item={todo}
                        onRemove={() => removeTodo(index)}
                    />;
                })}
            </ul>
        </>
    );
}
