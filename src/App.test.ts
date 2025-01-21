import { vi, describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import React from 'react'

vi.mock('@chakra-ui/react', async (importOriginal) => {
  const actual = await importOriginal()
  return Object.assign({}, actual, {
    useColorModeValue: (light: string, dark: string) => light || dark,
    useBreakpointValue: (values: { [key: string]: string | number }) => values.base,
  })
})

const AppComponent = () => React.createElement(App)

describe('Todo App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds a new todo', async () => {
    render((React.createElement(AppComponent)))
    const input = screen.getByPlaceholderText('What needs to be done?')
    fireEvent.change(input, { target: { value: 'New Todo' } })
    const addButton = screen.getByText('Add Todo')
    fireEvent.click(addButton)
    expect(await screen.findByText('New Todo')).toBeInTheDocument()
  })

  it('toggles todo completion', async () => {
    render((React.createElement(AppComponent)))
    const todoItem = screen.getByText('Тестовое задание')
    const checkbox = todoItem.closest('div')?.querySelector('input[type="checkbox"]')
    if (checkbox) {
      fireEvent.click(checkbox)
    }
    expect(todoItem).toHaveStyle('text-decoration: line-through')
  })

  it('deletes a todo', async () => {
    render((React.createElement(AppComponent)))
    const deleteButton = screen.getAllByLabelText('Delete todo')[0]
    fireEvent.click(deleteButton)
    expect(screen.queryByText('Тестовое задание')).not.toBeInTheDocument()
  })

  it('filters todos', async () => {
    render((React.createElement(AppComponent)))
    
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument()
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument()
    
    fireEvent.click(screen.getByText('Active'))
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument()
    expect(screen.queryByText('Прекрасный код')).not.toBeInTheDocument()
    
    fireEvent.click(screen.getByText('Completed'))
    expect(screen.queryByText('Тестовое задание')).not.toBeInTheDocument()
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument()
  })

  it('clears completed todos', async () => {
    render((React.createElement(AppComponent)))
    const clearCompletedButton = screen.getByText('Clear Completed')
    fireEvent.click(clearCompletedButton)
    expect(screen.queryByText('Прекрасный код')).not.toBeInTheDocument()
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument()
  })
})