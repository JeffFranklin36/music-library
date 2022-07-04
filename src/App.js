import { useState, useEffect, Fragment, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery';
import SearchBar from './Components/SearchBar';
import AlbumView from './Components/AlbumView.js';
import ArtistView from './Components/ArtistView';
import { createResource as fetchData } from './helper'
import Spinner from './Spinner';



function App() {
 const [search, setSearch] = useState('')
 const [message, setMessage] = useState('Search for Music!')
 const [data, setData] = useState(null)
 
 const handleSearch = (e, term) => {
  e.preventDefault()
  setSearch(term)
 }

 const renderGallery = () => {
  if(data){
      return (
          <Suspense fallback={<Spinner />}>
              <Gallery data={data} />
          </Suspense>
      )
  }
}


 useEffect(() => {
  if (search) {
      setData(fetchData(search))
  }
}, [search])


//  useEffect(() => {
//   if(search){ 
//     const fetchData = async () => {
//     document.title = `${search} Music`
//     const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
//     const resData = await response.json()
//     console.log(resData)
//     if (resData.results.length > 0) {
//       setData(resData.results)
//     } else {
//       setMessage('Not Found')
//     }
//   }

//   fetchData()
// }
//  }, [search])


 return (
  <div>
  {message}
      <Router>
          <Routes>
              <Route path="/" element={
                  <Fragment>
                      <SearchBar handleSearch = {handleSearch}/>
                      {renderGallery()}
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
