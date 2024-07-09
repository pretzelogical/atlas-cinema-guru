import Tag from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import { faClock as faClockOutline, faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import Button from "../general/Button";
import client from "../../client";
import { useEffect, useState } from "react";


export type MovieCardProps = {
  title: string,
  imgURL: string,
  tags: string[],
  imdbId: string,
  description: string,
};


export default function MovieCard({
  title,
  imgURL,
  tags,
  description,
  imdbId
}: MovieCardProps) {
  const {
    isFavorite,
    setIsFavorite,
    isWatchLater,
    setIsWatchLater
  } = useMovieUserInfo(imdbId);

  const handleClick = (type: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    if (type === 'favorite') {
      if (!isFavorite) {
        client
          .post(`/titles/favorite/${imdbId}`, {}, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(() => {
            setIsFavorite(true);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        client
          .delete(`/titles/favorite/${imdbId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(() => {
            setIsFavorite(false);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else if (type === 'watchLater') {
      if (!isWatchLater) {
        client
          .post(`/titles/watchlater/${imdbId}`, {}, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(() => {
            setIsWatchLater(true);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        client
          .delete(`/titles/watchlater/${imdbId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(() => {
            setIsWatchLater(false);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };
  return (
    <div className="movie-card-container">
      <div className="movie-card-image"
        style={{
          backgroundImage: `url(${imgURL})`
        }}>
        <div className="movie-card-actions">
          <Button
            label=""
            onClick={() => handleClick('watchLater')}
            icon={
              <FontAwesomeIcon
                icon={
                  isWatchLater
                    ? faClock
                    : faClockOutline
                }
              />
            }
            className='movie-card-icon'
          />
          <Button
            label=""
            onClick={() => handleClick('favorite')}
            icon={
              <FontAwesomeIcon
                icon={
                  isFavorite
                    ? faStar
                    : faStarOutline
                }
              />
            }
            className='movie-card-icon'
          />
        </div>
        <p className="movie-card-title">{title}</p>
      </div>
      <div className="movie-card-description">
        <p>{description}</p>
      </div>
      <div className="movie-card-tags">
        {tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            isActive={true}
          />
        ))}
      </div>
    </div>
  );
}


const useMovieUserInfo = (imdbId: string) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    client
      .get(`/titles/favorite`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data instanceof Array) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fav = response.data.find((movie: any) => movie.imdbId === imdbId);
          if (fav) {
            setIsFavorite(true);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });

    client
      .get(`/titles/watchlater`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const watch = response.data.find((movie: any) => movie.imdbId === imdbId);
        if (watch) {
          setIsWatchLater(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [imdbId]);

  return { isFavorite, isWatchLater, setIsFavorite, setIsWatchLater };
};