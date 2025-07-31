'use client'
import { useState, useEffect } from 'react'

type Item = { id: number; name: string; done: boolean }

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(setItems)
  }, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return // prevent empty submissions
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (res.ok) {
      const newItem = await res.json()
      setItems([...items, newItem])
      setName('')
    }
  }

  return (
    <main>
      <form onSubmit={create}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="New item"
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} {item.done ? '(done)' : ''}
          </li>
        ))}
      </ul>
    </main>
  )
}
