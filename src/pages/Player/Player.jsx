import { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  });

  useEffect(() => {
    // Fetch via internal Vercel API proxy route
    fetch(`/api/videos?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          // Find the official YouTube Trailer first
          const trailer = res.results.find(
            (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
          );
          // Fallback to any YouTube video if explicit trailer is not labeled
          const selectedVideo = trailer || res.results.find((vid) => vid.site === 'YouTube') || res.results[0];
          
          if (selectedVideo) {
            setApiData(selectedVideo);
          }
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube-nocookie.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div style={{ color: 'white', marginTop: '20px' }}>Trailer unavailable</div>
      )}
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : ''}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;