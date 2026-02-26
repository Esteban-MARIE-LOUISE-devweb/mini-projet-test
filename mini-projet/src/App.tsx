import { useState } from 'react'
import './App.css'
import Formulaire from './components/Formulaire'
import Tableau from './components/Tableau'

function App() {
  const [formData, setFormData] = useState({
    poidsMin: 50,
    poidsMax: 100,
    nbLignes: 5,
    selectionObjectif: [],
  })

  return (
    <div className="App">
      <h1>Calculateur de Protéines</h1>
      <Formulaire data={formData} onUpdate={setFormData} />
      <hr />
      <Tableau parametres={formData} />
    </div>
  )
}

export default App