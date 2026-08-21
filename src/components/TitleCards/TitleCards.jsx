import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  useEffect(() => {
    const selectedCategory = category || 'now_playing';

    // Call your local Vercel serverless proxy route instead of TMDB directly
    fetch(`/api/movies?category=${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results) {
          setApiData(data.results);
        }
      })
      .catch((err) => console.error('Fetch error:', err));

    const currentRef = cardsRef.current;
    
    const handleWheel = (event) => {
      event.preventDefault();
      if (currentRef) {
        currentRef.scrollLeft += event.deltaY;
      }
    };

    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]); // Category added to dependency array to re-fetch when props change

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData && apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={card.id || index}>
              <img 
                src={card.poster_path ? `https://image.tmdb.org/t/p/w500${card.poster_path}` : ''} 
                alt={card.original_title || 'Movie'} 
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;