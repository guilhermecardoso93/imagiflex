import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import placeholder from "../assets/hero.jpg";

const Hero = ({ title = "X-men - Days of Future Past", score = 10 }) => {
  const getBorderColor = () => {
    if (score >= 7) return "border-green-400";
    else if (score > 4 && score < 7) {
      return "border-yellow-400";
    } else {
      return "border-red-400";
    }
  };

  return (
    <header className="box-border relative min-h-screen -mb-32">
      <img
        className="object-cover object-center h-auto w-full"
        src={placeholder}
        alt="Filme em destaque"
      />
      <div className="absolute  left-0 bottom-0 w-full h-full bg-gradient-to-b from-transparent to-black">
      <article className="absolute bottom-0 mb-64 px-8">
        <p className="text-3xl ">Assista Agora:</p>
        <h2 className="text-6xl font-bold">{title}</h2>
        <p className="text-base pt-2">
          Nota
          <span
            className={`inline-block mx-2 py-2 px-3 bg-black bg-opacity-75  border-4 rounded-full ${getBorderColor()}`}
          >
            {score}
          </span>
        </p>
        <button className="text-base rounded py-2 px-8 mr-2 mt-8 bg-black bg-opacity-50 transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-75 hover:text-black">
          <FontAwesomeIcon className='mr-1' icon={faPlay} /> Assistir
        </button>
        <button className="text-base rounded py-2 px-8 mr-2 mt-8 bg-black bg-opacity-50 transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-75 hover:text-black">
          <FontAwesomeIcon className='mr-1' icon={faPlus} /> Minha Lista
        </button>
      </article>
      </div>
    </header>
  );
};

export default Hero;
