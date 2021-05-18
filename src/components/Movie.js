import { Component } from "react";
import { timeConversion } from "../helpers";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Modal from "react-modal";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      api_key: "207725ce9b626a5f28419fafae9d96ac",
      credits: null,
      videos: null,
      keywords: null,
      customStyles: {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          border: "0",
          padding: "0",
        },
      },
      videoModalIsOpen: false,
      selectedVideo: "",
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    const id = this.props.id;
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=" +
        this.state.api_key +
        "&language=tr"
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ movie: res });
      });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/credits?api_key=" +
        this.state.api_key +
        "&language=tr"
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ credits: res });
      });

    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/videos?api_key=" +
        this.state.api_key
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ videos: res.results });
      });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/keywords?api_key=" +
        this.state.api_key
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ keywords: res.keywords });
      });
  }

  openModal(videoid) {
    this.setState({ videoModalIsOpen: true, videoid: videoid });
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ videoModalIsOpen: false });
  }

  render() {
    return (
      <div className="p-0 h-100 bg-white">
        <Modal
          isOpen={this.state.videoModalIsOpen}
          onRequestClose={this.closeModal}
          style={this.state.customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          {this.state.videoModalIsOpen ? (
            <div className="movie-video">
              <iframe
                className="movie-video-youtube"
                title={this.state.videoid}
                src={`https://www.youtube.com/embed/${this.state.videoid}?autoplay=1`}
              ></iframe>
            </div>
          ) : null}
        </Modal>
        {this.state.movie ? (
          <div>
            <div
              className="movie-backdrop overflow-hidden"
              style={{
                opacity: 0.1,
              }}
            ></div>
            <div className="movie-backdrop-container p-4 position-relative">
              <div
                className="w-100 position-absolute movie-poster"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280${this.state.movie.backdrop_path})`,
                }}
              ></div>
              <div className="container d-flex justify-content-center align-items-center h-100">
                <div className="row">
                  <div className="movie-poster-image col-12 col-md-12 col-lg-3 text-center py-sm-4">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${this.state.movie.poster_path}`}
                      alt=""
                    />
                  </div>
                  <div className="col-12 col-md-12 col-lg-9 text-center text-md-left text-lg-left my-3">
                    <h3 className="text-white display-4 d-flex justify-content-center justify-content-lg-start align-items-center">
                      <span className="mr-3 ">{this.state.movie.title}</span>{" "}
                      <span className="display-6">
                        ({this.state.movie.release_date})
                      </span>
                    </h3>
                    <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                      <div className="vote-average" id="rate">
                        <CircularProgressbar
                          value={this.state.movie.vote_average * 10}
                          text={`${this.state.movie.vote_average * 10}%`}
                          styles={buildStyles({
                            trailColor: "#204529",
                            pathColor: "#1DA865",
                            textColor: "white",
                          })}
                        />
                      </div>
                      <div className="general-information mx-2">
                        <span className="relase-date text-white">
                          {this.state.movie.release_date
                            .split("-")
                            .reverse()
                            .join("/")}{" "}
                          ({this.state.movie.original_language.toUpperCase()})
                        </span>
                        <span className="mx-2 text-white">*</span>
                        <span className="text-white genres">
                          {this.state.movie.genres
                            .map((genre) => genre.name)
                            .join(",")}
                        </span>
                        <span className="mx-2 text-white">*</span>
                        <span className="showtime text-white">
                          {timeConversion(this.state.movie.runtime)}
                        </span>
                      </div>
                    </div>
                    <div className="tagline mt-4">
                      <span className="text-white">
                        {this.state.movie.tagline}
                      </span>
                    </div>
                    <div className="overview mt-4 d-flex flex-column align-items-center align-items-lg-start my-5">
                      <h4 className="text-white">Özet</h4>
                      <p className="text-white">{this.state.movie.overview}</p>
                    </div>
                    <div>
                      <h4 className="text-white">Etiketler</h4>

                      {this.state.keywords
                        ? this.state.keywords.map((keyword) => (
                            <p
                              key={keyword.id}
                              className="text-white p-1 bg-secondary rounded my-2 mr-1 d-inline-block"
                            >
                              {keyword.name}
                            </p>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <h4 className="pt-3 px-3">Oyuncular</h4>
              {this.state.credits ? (
                <div
                  className="d-flex text-left text-break w-100 overflow-auto"
                  style={{ gap: "10px" }}
                >
                  {this.state.credits.cast.slice(0, 12).map((item) => (
                    <div
                      key={item.id}
                      style={{ width: "calc(100% / 5)" }}
                      className="p-3"
                    >
                      {item.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w154${item.profile_path}`}
                          alt=""
                          style={{
                            width: "120px",
                          }}
                        />
                      ) : (
                        <img
                          src="https://staffordonline.org/wp-content/uploads/2018/07/Man_silhouette.png"
                          alt=""
                          style={{
                            width: "120px",
                          }}
                        />
                      )}

                      <p
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {item.original_name}
                      </p>
                      <p
                        className="text-break"
                        style={{
                          fontSize: "11px",
                          width: "80%",
                        }}
                      >
                        {item.character}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              <h4 className="pt-3 px-3">Yapımcıları</h4>
              {this.state.movie ? (
                <div
                  className="d-flex text-left text-break w-100 overflow-auto"
                  style={{ gap: "10px" }}
                >
                  {this.state.movie.production_companies.map((item) => (
                    <div
                      key={item.id}
                      style={{ width: "calc(100% / 5)" }}
                      className="p-3"
                    >
                      {item.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w154${item.logo_path}`}
                          alt=""
                          style={{
                            width: "120px",
                          }}
                        />
                      ) : (
                        <img
                          src="https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"
                          alt=""
                          style={{
                            width: "120px",
                          }}
                        />
                      )}

                      <p
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-break"
                        style={{
                          fontSize: "11px",
                          width: "80%",
                        }}
                      >
                        {item.character}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
              <h4 className="pt-3 px-3">Film Videoları</h4>
              {this.state.videos ? (
                <div className="d-flex w-100 overflow-auto py-2 pb-4">
                  {this.state.videos.map((video) => (
                    <div
                      className="video-container"
                      key={video.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => this.openModal(video.key)}
                    >
                      <div className="play-icon text-white">▶</div>
                      <img
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        alt=""
                        height="300px"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
