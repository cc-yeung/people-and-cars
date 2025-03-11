import './App.css'
import Person from './components/list/Person'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import AddPerson from './components/form/AddPerson'
import AddCar from './components/form/AddCar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PersonDetail from './page/PersonDetail'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})
function App() {
  return (
    <ApolloProvider client={client} >
      <div className="App">
        <h1>PEOPLE AND THEIR CARS</h1>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AddPerson />
                  <AddCar />
                  <Person />
                </>
              }
            />
            <Route
              path="/person/:id"
              element={
                <>
                  <PersonDetail />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  )
}

export default App
