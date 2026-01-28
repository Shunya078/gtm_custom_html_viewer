import { useState } from 'react'
import { Editor } from './components/Editor'
import { Preview } from './components/Preview'
import {DEFAULT_HTML} from "./constants/defaultHTML.ts";

function App() {
  const [html, setHtml] = useState(DEFAULT_HTML)

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <header className="flex-none px-4 py-2 bg-gray-800 border-b border-gray-700">
        <h1 className="text-lg font-semibold text-white">GTM Sample Viewer</h1>
      </header>
      <main className="flex-1 flex min-h-0">
        <div className="w-1/2 h-full border-r border-gray-700">
          <Editor value={html} onChange={setHtml} />
        </div>
        <div className="w-1/2 h-full">
          <Preview html={html} />
        </div>
      </main>
    </div>
  )
}

export default App
