import React from 'react';
import './CreateTodoButton.css';
import swal from 'sweetalert';

function CreateTodoButton(props) {
  const onClickButton = (msg) => {
    alert(msg);
  }
  return (
    <button 
    className="CreateTodoButton"
    onClick={() => onClickButton(swal('Aquí va un modal'))}

    >
      +
    </button>
  );
}

export { CreateTodoButton };
