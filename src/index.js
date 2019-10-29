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
  state = {
    characters: [],
    numbers: 10
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
    this.setState(
      {
        numbers: window.sessionStorage.getItem("cantidadPersonajes")
      },
      () => {
        for (var i = 0; i <= this.state.numbers; i++) {
          fetchCharacters(i);
        }
      }
    );
  };

  render() {
    return (
      <div className="container">
        <img className="Logo" src={logo} alt="Rick y Morty" />
        <div style={{ marginLeft: "30.7%" }}>
          <input
            value={this.state.numbers}
            onChange={e => {
              this.setState({ numbers: e.target.value });
            }}
            name="inputNumbers"
            style={{ height: "34px" }}
            type="number"
          ></input>
          <button
            onClick={() => {
              window.sessionStorage.setItem(
                "cantidadPersonajes",
                this.state.numbers
              );
              document.location.reload(true);
            }}
            style={{
              marginLeft: "16px",
              height: "34px",
              lineHeight: "0px",
              backgroundColor: "#00afc8",
              boxShadow: "4px 3px 3px #b7ca52"
            }}
          >
            Actualizar
          </button>
        </div>
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
