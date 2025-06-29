import { useState } from 'react'
import './App.css'

interface OutlinerItem {
  id: string
  title: string
  content: string
  children: OutlinerItem[]
  isExpanded: boolean
}

function App() {
  const [items, setItems] = useState<OutlinerItem[]>([
    {
      id: '1',
      title: 'Welcome to Infinite Outliner',
      content: 'This is your first note. Click to edit or add new items.',
      children: [],
      isExpanded: true
    }
  ])

  const addItem = (parentId: string | null = null) => {
    const newItem: OutlinerItem = {
      id: Date.now().toString(),
      title: 'New Item',
      content: '',
      children: [],
      isExpanded: true
    }

    if (parentId === null) {
      setItems([...items, newItem])
    } else {
      // Add to specific parent - this would need recursive logic
      setItems([...items, newItem])
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Infinite Outliner</h1>
        <button onClick={() => addItem()}>Add Item</button>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
          <div className="outline-tree">
            {items.map((item) => (
              <div key={item.id} className="outline-item">
                <div className="item-header">
                  <span className="expand-toggle">▶</span>
                  <span className="item-title">{item.title}</span>
                </div>
                {item.children.length > 0 && (
                  <div className="item-children">
                    {item.children.map((child) => (
                      <div key={child.id} className="outline-item child">
                        <span className="item-title">{child.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
        
        <main className="main-content">
          <div className="editor">
            <h2>Editor</h2>
            <p>Select an item from the sidebar to edit its content.</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
