import React from 'react';
import Todo from './Todo';
export default function Todolist({todolist, onCheckBtnClick}) {
    return (
        <>
            {todolist.map(todo => 
                <Todo key={todo.id} todo={todo} onCheckBtnClick={onCheckBtnClick}/>
            )}
        </>
    )
}
