import React, { useState, useEffect } from "react";
import Cards from "./components/Cards";
import Search from "./components/Search";

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);

  //now whenever term changes this fetch request will run again
  // empty array at the end for dependencies 

  return(
    <div className="container mx-auto lg:ml-12">

      <Search searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && <h1 className="text-5xl mx-auto text-center mt-32 text-gray-600">No Images Found </h1> }

      {isLoading? <h1 className="text-6xl mx-auto text-center mt-32 text-gray-600">Loading... Hang on a sec.</h1> : <div className="grid grid-cols-3 gap-4 lg:gap-2 lg:px-12">
        {images.map(image => (
          <Cards key={image.id} image={image}/> 
        ))}
      </div>}

  </div>
  )

} 

export default App;
