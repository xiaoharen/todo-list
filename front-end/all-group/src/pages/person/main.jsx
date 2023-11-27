import React from 'react'
import ReactDOM from 'react-dom/client'
import Person from "./index.jsx";

ReactDOM.createRoot(document.getElementById('person')).render(
    <React.StrictMode>
        <Person />
    </React.StrictMode>,
)