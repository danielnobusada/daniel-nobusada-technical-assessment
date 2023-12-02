'use client'

import { FC, createContext, useMemo, useReducer } from "react"

interface TodoState {
  todoList: TodoList;
  addTodo: (userTodoToAdd : UserTodoToAdd) => void;
  deleteTodo: (userId: string, todoId: string) => void;
  toggleTodo: (userId: string, todoId: string) => void;
}

const initialState: TodoState = {
  //todoList: [{userId: '', items: []}],
  todoList: [],
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
};

export const TodoContext = createContext(initialState)

export const actionTypes = {
  ADD_TODO_ITEM: 'ADD_TODO_ITEM',
  DELETE_TODO_ITEM: 'DELETE_TODO_ITEM',
  TOGGLE_TODO_ITEM: 'TOGGLE_TODO_ITEM',
}

export const TodoContextProvider: FC = (props: any) => { 

  const todoReducer = (state: any, action: any) => {
    switch (action.type) {
      case actionTypes.ADD_TODO_ITEM: {
        // first add todo item runs once
        // from second add todo onward it runs twice
        debugger;
        if (state.todoList.length > 0) {
          const userTodoList = state.todoList
            .filter((todoUserList: UserTodos) => todoUserList.userId === action.payload.userId)
          if (userTodoList.length > 0) {
            userTodoList[0].items.push(action.payload.item)
            return {
              ...state,
              todoList: [...state.todoList]
            }
          }
          // what if list gets empty?
        }
        var userTodos : UserTodos = {
          userId: action.payload.userId,
          items: [action.payload.item]
        }
          return {
            ...state,
            todoList: [...state.todoList, userTodos] // convert item to items list
          }
      }
      /*
      case actionTypes.DELETE_TODO_ITEM: {
        // this scenario wasnt property tested due the list not being maintained properly
        const userTodoList = state.todoList
          .filter((todoUserList: UserTodos) => todoUserList.userId === action.payload.userId)
          .filter((todoUserList: UserTodos) => todoUserList.items[0].id !== action.payload.todoId)
        return {
          ...state,
          todoList: [...userTodoList]
        }
      }
      case actionTypes.TOGGLE_TODO_ITEM: {
        // this scenario wasnt property tested due the list not being maintained properly
        const userTodolist = state.todoList
          .filter((todoUserList: UserTodos) => todoUserList.userId === action.payload.userId)
          .map((todoUserList: UserTodos) => {
            const todoItem = todoUserList.items
              .filter((item: Todo) => item.id === action.payload.todoId)
            todoItem[0].completed = !todoItem[0].completed
            return todoUserList
          })
          return {
            ...state,
            todoList: [...userTodolist]
          }
      }
      */
      default:
        return state
    }
  } 

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = (userTodoToAdd: UserTodoToAdd) => dispatch({
    type: actionTypes.ADD_TODO_ITEM,
    payload: userTodoToAdd
  })

  const deleteTodo = (userId: string, todoId: string) => dispatch({
    type: actionTypes.DELETE_TODO_ITEM,
    payload: { userId, todoId }
  })

  const toggleTodo = (userId: string, todoId: string) => dispatch({
    type: actionTypes.TOGGLE_TODO_ITEM,
    payload: { userId, todoId }
  })

  const value = useMemo (
    () => ({
      ...state,
      addTodo,
      deleteTodo,
      toggleTodo
    }),
    [state],
  )

  return (
    <TodoContext.Provider value={value}>
      {props.children}
    </TodoContext.Provider>
  )
}