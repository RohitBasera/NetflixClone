import React ,{ useEffect,useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'





const TitleCards = ({title , category}) => {
  const[apiData,setApiData] = React.useState([]);

const cardsRef = useRef();
const options = {
  method: 'GET',
  headers: {accept: 'application/json',  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWY5MWFjY2Y2YTIxZTI3ZTI2YmVmYjEzMzdjNjFhZCIsIm5iZiI6MTc4NTkzNjE4NC41MzIsInN1YiI6IjZhNzMzOTM4OTE1NmVmMjJlOTE1NTI3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E_1x_XWOGY7T-fCrZgHtKkIhgLRMj6HxwH_s7Tp655c'}
};




const handlewheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;

}


useEffect(()=>{ 
  fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handlewheel);
},[])

  return (
    <div className='title-cards'>
      <h2>{title?title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <div className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500'+card.poster_path} alt="" />
            <p>{card.original_title}</p>
            </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
