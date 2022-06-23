import { useState, useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery';
import SearchBar from './Components/SearchBar';
import AlbumView from './Components/AlbumView.js';
import ArtistView from './Components/ArtistView';


function App() {
 const [search, setSearch] = useState('')
 const [message, setMessage] = useState('Search for Music!')
 const [data, setData] = useState([])
 
 const handleSearch = (e, term) => {
  e.preventDefault()
  setSearch(term)
 }

 useEffect(() => {
  if(search){ 
    const fetchData = async () => {
    document.title = `${search} Music`
    const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
    const data = await response.json()
    console.log(data)
    if (data.results.length > 0) {
      setData(data.results)
    } else {
      setMessage('Not Found')
    }
  }

  fetchData()
}
 }, [search])


 return (
  <div>
  {message}
      <Router>
          <Routes>
              <Route path="/" element={
                  <Fragment>
                      <SearchBar handleSearch = {handleSearch}/>
                      <Gallery data={data} />
                  </Fragment>
              } />
              <Route path="/album/:id" element={<AlbumView />} />
              <Route path="/artist/:id" element={<ArtistView />} />
          </Routes>
      </Router>
  </div>
  )
}

export default App;
