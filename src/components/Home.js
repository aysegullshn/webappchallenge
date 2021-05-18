import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
function Home() {
  const history = useHistory();
  const [popularMovies, setPopularMovies] = useState({});
  const [topRatedMovies, setTopRatedMovies] = useState({});
  const api_key = "207725ce9b626a5f28419fafae9d96ac";
  const showMovie = (id) => {
    history.push("/movie/" + id);
  };
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular/?api_key=" +
        api_key +
        "&language=tr&page=1"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPopularMovies(res.results);
      })
      .catch((err) => console.error(err));
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated/?api_key=" +
        api_key +
        "&language=tr"
    )
      .then((res) => res.json())
      .then((res) => {
        setTopRatedMovies(res.results);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="container movies p-0" id="popular-movies">
      <div
        className="jumbotron jumbotron-fluid p-3 my-5"
        style={{ background: "#ececec" }}
      >
        <h1 className="display-4">Herkes için film</h1>
        <p className="lead">Film</p>
      </div>

      <h3>Popüler Filmler</h3>
      <div className="movies-inner">
        <Swiper
          spaceBetween={50}
          effect="fade"
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          onSlideChange={() => console.log("slide change")}
        >
          {popularMovies.length > 0 ? (
            popularMovies.map((movie) => (
              <SwiperSlide
                onClick={(e) => showMovie(movie.id)}
                className="d-flex flex-column movie-item position-relative"
                key={movie.id}
              >
                <div className="m-3 m-lg-0 border rounded">
                  <div className="movie-item-vote-average">
                    <CircularProgressbar
                      value={movie.vote_average * 10}
                      text={`${movie.vote_average * 10}%`}
                      styles={buildStyles({
                        trailColor: "#204529",
                        pathColor: "#1DA865",
                        textColor: "white",
                        textSize: "24px",
                      })}
                    />
                  </div>
                  <div className="movie-item-poster-image">
                    <img
                      width="100%"
                      height="400px"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt=""
                      style={{
                        borderRadius: "5px 5px 0 0",
                      }}
                    />
                  </div>
                  <div className="p-2 mt-3 d-flex flex-column align-items-center text-center">
                    <p>{movie.title}</p>
                    <p className="release-date">{movie.release_date}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p>Yükleniyor</p>
          )}
        </Swiper>
      </div>
      <h3>Trend Filmler</h3>
      <div className="movies-inner">
        <Swiper
          spaceBetween={50}
          effect="fade"
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          onSlideChange={() => console.log("slide change")}
        >
          {topRatedMovies.length > 0 ? (
            topRatedMovies.map((movie) => (
              <SwiperSlide
                onClick={(e) => showMovie(movie.id)}
                className="d-flex flex-column movie-item position-relative"
                key={movie.id}
              >
                <div className="m-3 m-lg-0 border rounded">
                  <div className="movie-item-vote-average">
                    <CircularProgressbar
                      value={movie.vote_average * 10}
                      text={`${movie.vote_average * 10}%`}
                      styles={buildStyles({
                        trailColor: "#204529",
                        pathColor: "#1DA865",
                        textColor: "white",
                        textSize: "24px",
                      })}
                    />
                  </div>
                  <div className="movie-item-poster-image">
                    <img
                      width="100%"
                      height="400px"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt=""
                      style={{
                        borderRadius: "5px 5px 0 0",
                      }}
                    />
                  </div>
                  <div className="p-2 mt-3 d-flex flex-column align-items-center text-center">
                    <p>{movie.title}</p>
                    <p className="release-date">{movie.release_date}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p>Yükleniyor</p>
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
