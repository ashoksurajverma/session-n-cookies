import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState("")
  useEffect(() => {
    fetch("http://localhost:8080/")
    .then(res => {
      return res.json()
    })
    .then(data => {
      setMessage(data?.message)
    })
    .catch(err => {
      console.error(err);
    })
  }, [])
  
  return (
    <div className="App">
      {message}
    </div>
  );
}

export default App;
