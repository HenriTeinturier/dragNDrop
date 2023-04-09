import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../../api/todosApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    isError,
    data: todosNotSortedFromDraggable,
  } = useQuery('todos', getTodos, {
    select: data => data.sort((a, b) => b.id - a.id)
  });

  const [todos, setTodos] = useState(todosNotSortedFromDraggable || []);

  useEffect(() => {
    console.log('update Todos after fetching');
    setTodos(todosNotSortedFromDraggable);
  }, [todosNotSortedFromDraggable]);


  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      // Invalidate cache and then refetch
      queryClient.invalidateQueries('todos');
    }
  })

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      // Invalidate cache and then refetch
      queryClient.invalidateQueries('todos');
    }
  })

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      // Invalidate cache and then refetch
      queryClient.invalidateQueries('todos');
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({userId: 1, title: newTodo, completed: false});
    setNewTodo('');
  }

  const handleOnDragEnd = (result) => {
    console.log(result);

    if (!result.destination) return;

    const tasks = [...todos];

    const [reorderedItem] = tasks.splice(result.source.index, 1);

    tasks.splice(result.destination.index, 0, reorderedItem);

    setTodos(tasks);

  }

   

   const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    )

    let content
    if (isLoading) {
      content  = <p>Loading...</p>
    } else if (isError) {
      content = <p>Error: {error.message}</p>
    } else {
      content = (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos">
          {(provided) => (
            <section {...provided.droppableProps} ref={provided.innerRef}>
              {
                todos?.map((todo, index) => {
                  return (
                    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                      {(provided) => (
                        <article {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                            <div className="todo">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    id={todo.id}
                                    onChange={() =>
                                        updateTodoMutation.mutate({ ...todo, completed: !todo.completed })
                                    }
                                />
                                <label htmlFor={todo.id}>{todo.title}</label>
                            </div>
                            <button className="trash" onClick={() => deleteTodoMutation.mutate({ id: todo.id })}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </article>
                      )}
                    </Draggable>
                  )
                })
              }
              {provided.placeholder}
            </section>
          )}
          </Droppable>
        </DragDropContext>
      )
    }


  return (
    <main>
      <h1>Todo List</h1>
      {
        newItemSection
      }
      {content}
    </main>
  )
}
