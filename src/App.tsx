import React, { useState, useEffect } from "react";

import emitter from "./utils/eventEmitter";

import CONST from "./data/constants";

import Loading from "./components/Loading";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export enum TitleType {
  Movie = "movie",
  Serie = "tv",
}

export interface Title {
  type: TitleType;
  id: number | string;
}

const App = () => {
  const { URL, APISTRING } = CONST;

  const [movies, setMovies] = useState({ results: [] });
  const [series, setSeries] = useState({ results: [] });
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(true);

  const getMovieFeatured = () => movies && movies?.results[0];

  const getMovieList = () => {
    if (movies) {
      const [featured, ...movieList] = movies?.results;
      return movieList;
    }
    return [];
  };

  const getTitle = async ({ type, id }: Title) => {
    const title = await fetch(
      `${URL}/${type}/${id}${APISTRING}&language=pt-BR&`
    );
    const titleData = await title.json();
    setTitle(titleData);
    setLoading(false);
  };

  const fetchData = async () => {
    const response = await fetch(
      `${URL}/discover/movie?${APISTRING}&language=pt-BR&sort_by=popularity.desc`
    );
    const data = await response.json();
    setMovies(data);

    const series = await fetch(
      `${URL}/discover/tv?${APISTRING}&language=pt-BR&sort_by=popularity.desc`
    );

    const seriesData = await series.json();
    setSeries(seriesData);
    setLoading(false);
  };
  useEffect(() => {
    emitter.addListener(CONST.EVENTS.PosterClick, getTitle);
    fetchData();
  }, []);

  useEffect(() => title && console.log(title), [title]);

  return (
    <div className="m-auto antialised  font-sans bg-black text-white">
      {loading && (
        <>
          <Loading />
          <NavBar />
        </>
      )}
      {!loading && (
        <>
          <Hero {...getMovieFeatured()} />
          <NavBar />
          <Carousel title="Filmes Populares" data={getMovieList()} />
          <Carousel title="Séries Populares" data={series?.results} />
          <Carousel title="Filmes Populares" data={getMovieList()} />
          <Carousel title="Séries Populares" data={series?.results} />
          <Carousel title="Placeholder" />
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
