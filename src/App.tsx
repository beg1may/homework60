import React from 'react';
import Chat from "./Components/Chat/Chat";

function App() {
    const author = "User";
    return (
        <>
            <div className="row">
                <Chat author={author}/>
            </div>
        </>
    );
}

export default App;
