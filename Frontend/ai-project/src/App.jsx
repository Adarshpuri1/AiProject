import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import Markdown from 'react-markdown'
import rehypehighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState("")
  const [review,setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  async function reviewcode() {
    if (!code.trim()) {
      alert("Please write some code first")
      return
    }

    try {
      const resp = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code }
      )
      setReview(resp.data)
    } catch (error) {
      console.error("Review error:", error)
    }
  }

  return (
    <main>
      <div className='left'>
        <div className='code'>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>

        <div className='review'>
          <button onClick={reviewcode}>Review</button>
        </div>
      </div>

      <div className='right'>
       <Markdown rehypePlugins={[rehypehighlight]}>
        {review}
       </Markdown>
      </div>
    </main>
  )
}

export default App
