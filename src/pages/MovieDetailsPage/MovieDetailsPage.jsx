
import css from "./MovieDetailsPage.module.css";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../service/movieAPI";
import Loader from "../../components/Loader/Loader";

const MovieDetailsPage = () => {
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const backlink = useRef(location.state ?? "/");

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    if (!movieId) return;

    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const requestData = await fetchMovieDetails(movieId);
        setMovie(requestData);
      } catch {
        setError("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [movieId]);

  return (
    <div>
      <div className={css.goBack}>
        <Link to={backlink.current}>Go Back</Link>
      </div>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {movie && (
        <div>
          <div className={css.container}>
            <img
              className={css.poster}
              src={
                movie.poster_path
                  ? `${BASE_IMAGE_URL}${movie.poster_path}`
                  : defaultImg
              }
              width={250}
              alt={movie.title || "Movie poster"}
            />
            <div className={css.desTitle}>
              <h1 className={css.title}>{movie.title}</h1>
              <div className={css.description}>
                <h2 className={css.heading}>Overview</h2>
                <p className={css.des}>{movie.overview}</p>
                <h2 className={css.heading}>Genres</h2>
                <p className={css.des}>
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className={css.additional}>Additional Information</h2>
            <div className={css.additionalLink}>
              <Link
                className={css.revCast}
                to="reviews"
                state={backlink.current}
              >
                Reviews
              </Link>
              <Link className={css.revCast} to="cast" state={backlink.current}>
                Cast
              </Link>
            </div>
          </div>
        </div>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
