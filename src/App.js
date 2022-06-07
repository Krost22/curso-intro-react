import React from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import swal from 'sweetalert';
// import './App.css';

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el curso de intro a React', completed: false },
//   { text: 'Almorzar', completed: false },
  
// ];

//Devuelve los items de localstorage de nuestros TODOs

function useLocalStorage(itemName, initialValue) {
  
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;
  
  if (!localStorageItem){
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  }else{
    parsedItem = JSON.parse(localStorageItem);
  }
  
  const [item, setItem] = React.useState(parsedItem);
  
  const saveItem = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  };

  //Elementos que se guardan en localStorage
  return[
    item,
    saveItem,
  ];
}

function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

//Filtrar los TODOs que busque el usuario

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }
//-----------------------------------------------

  const  alertCheck = () => {
    swal({
       title: "Se Completó el TODO ",
       icon: "success",
       timer: 1000,
     }); 
   };

//Busca cual de todos los TODOs cumple con la condicion(mismo texto)
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
    alertCheck();
  };

  const  alertDelete = () => {
    swal({
       title: "Se eliminó el TODO ",
       icon: "info",
       timer: 1000,
     }); 
   };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
    alertDelete();
    
  };

//-----------------------------------------------

  return (
    <React.Fragment>
      <TodoCounter 
        total={totalTodos}
        completed={completedTodos}
      />
      <TodoSearch 
       searchValue={searchValue}
       setSearchValue={setSearchValue}
      />
      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={()   =>   deleteTodo(todo.text)}

          />
        ))}
      </TodoList>

      <CreateTodoButton />
      <footer />
    </React.Fragment>
  );
}

export default App;
