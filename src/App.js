
import TodoList from './components/Todolist';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import React, { useState ,useCallback, useEffect } from 'react';
import {v4} from 'uuid';

const TODO_APP_STORAGE_KEY = 'TODO_APP';
function App() {
  const [todolist,settodolist] = useState([]);
  const [textInput,setTextInput] = useState("");
  useEffect (() =>{
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      settodolist(JSON.parse(storageTodoList))
    }
  },[]);
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY,JSON.stringify(todolist));
  },[todolist])
  const onTextInputChange = useCallback(
    (e) => {
      setTextInput(e.target.value);
    },[]
    );
  const onAddBtnClick = useCallback(
    (e) => {
      settodolist(
        [{id: v4(),name: textInput, isCompleted: false},
        ...todolist]);
      setTextInput("")
    },
    [textInput,todolist]);
  const onCheckBtnClick = useCallback(
      (id) => {
          settodolist(
              (prevState) =>
                prevState.map((todo) => 
                  todo.id === id ? { ...todo, isCompleted: true } : todo)
          );
      },[]
  );
  return ( 
  <>
    <h3>Danh sách việc cần làm</h3>
    <Textfield name="add-todo" placeholder="Thêm việc cần làm..." 
        elemAfterInput={
            <Button isDisabled={!textInput} appearance='primary' onClick={onAddBtnClick}>
                Thêm
            </Button>
        }
        css={{ padding: '2px 4px 2px'}}
        value={textInput}
        onChange={onTextInputChange}
    ></Textfield>
    <TodoList todolist={todolist} onCheckBtnClick={onCheckBtnClick} />
  </>
);
}

export default App;
