import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import logo from "./images/logo.png";
import $ from "jquery";
window.$ = $;

function CharacterCard(props) {
  const { name, image, number } = props;
  return (
    <div className="CharacterCard" style={{ backgroundImage: `url(${image})` }}>
      <div className="CharacterCard__name-container text-truncate">
        <span style={{ textAlign: "left", color: "red" }}>{number}</span>
        <span style={{ marginLeft: "10px" }}>{name}</span>
      </div>
    </div>
  );
}

class App extends React.Component {
  number = 50;
  state = {
    characters: []
  };

  componentDidMount = () => {
    const scope = this;
    const fetchCharacters = function(id) {
      $.get(
        `https://rickandmortyapi.com/api/character/${id}`,
        { crossDomain: true },
        function() {
          const { name, image } = arguments[0];
          let newState = scope.state.characters;
          newState.push({ name, image, number: id });
          scope.setState({ characters: newState });
        }
      );
    };

    for (var i = 0; i <= this.number; i++) {
      fetchCharacters(i);
    }
  };

  render() {
    return (
      <div className="container">
        <img className="Logo" src={logo} alt="Rick y Morty" />
        <h1>Mostrando los primeros {this.number}</h1>
        <ul className="row">
          {this.state.characters.map((char, i) => (
            <li className="col-6 col-md-3" key={i}>
              <CharacterCard
                name={char.name}
                image={char.image}
                number={char.number}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
