import React, { useState } from 'react'
import {
  gql,
  useQuery,
  useMutation,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'https://healthy-locust-20.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': import.meta.env.SNOWPACK_PUBLIC_HASURA_SECRET
  }
})

/**
 * Wrap the app with <ApolloProvider client={client}></ApolloProvider>
 */

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const GET_TODOS = gql`
  query getTodos {
    todos {
      done
      id
      text
    }
  }
`

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_todos(where: { id: { _eq: $id } }, _set: { done: $done }) {
      returning {
        done
        id
        text
      }
    }
  }
`

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    insert_todos(objects: { text: $text }) {
      returning {
        done
        id
        text
      }
    }
  }
`

const DELETE_TODO = gql`
  mutation deleteTodos($id: uuid!) {
    delete_todos(where: { id: { _eq: $id } }) {
      returning {
        done
        id
        text
      }
    }
  }
`

interface ITodo {
  done: boolean
  id: string
  text: string
}

interface IGetTodosData {
  todos: ITodo[]
}

export const AppGraphqlChecklist = () => {
  const [todoText, setTodoText] = useState('')
  const { data, loading, error } = useQuery<IGetTodosData>(GET_TODOS)
  const [toggleTodo] = useMutation(TOGGLE_TODO)
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => setTodoText('')
  })
  const [deleteTodo] = useMutation(DELETE_TODO)

  const handleAddTodo = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (!todoText.trim()) return

    await addTodo({
      variables: { text: todoText },
      refetchQueries: [{ query: GET_TODOS }]
    })
  }

  const handleToggleTodo = async ({ id, done }: ITodo) => {
    await toggleTodo({ variables: { id: id, done: !done } })
  }

  const handleDeleteTodo = async ({ id }: ITodo) => {
    if (!window.confirm('Do you want to delete this todo?')) {
      return
    }

    await deleteTodo({
      variables: { id },
      update: cache => {
        const prevData = cache.readQuery<IGetTodosData>({ query: GET_TODOS })
        if (!prevData) return

        const newTodos = prevData.todos.filter(todo => todo.id !== id)
        cache.writeQuery({ query: GET_TODOS, data: { todos: newTodos } })
      }
    })
  }

  if (loading) return <div>loading...</div>

  if (error) {
    console.error(error)

    return <div>Error fetching todos!</div>
  }

  return (
    <div>
      <h1>GraphQL Checklist</h1>
      {/* Todo form */}
      <form onSubmit={ev => handleAddTodo(ev)}>
        <input
          type='text'
          name='todo'
          id='todo'
          placeholder='Write your todo'
          value={todoText}
          onChange={ev => setTodoText(ev.target.value)}
        />
        <button type='submit'>Create</button>
      </form>
      {/* Todo list */}
      <ul>
        {typeof data !== 'undefined' &&
          data.todos.map(todo => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.done ? 'line-through' : '' }}>
                {todo.text}
              </span>{' '}
              <button type='button' onClick={() => handleToggleTodo(todo)}>
                &#10003;
              </button>
              <button type='button' onClick={() => handleDeleteTodo(todo)}>
                &times;
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
