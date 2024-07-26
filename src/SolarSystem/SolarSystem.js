import React from "react";
import "./SolarSystem.scss";

const planets = [
  { id: "mercury", name: "Mercury", au: "0.39 AU", type: "Planet" },
  { id: "venus", name: "Venus", au: "0.723 AU", type: "Planet" },
  { id: "earth", name: "Earth", au: "1 AU", type: "Planet" },
  { id: "mars", name: "Mars", au: "1.524 AU", type: "Planet" },
  { id: "jupiter", name: "Jupiter", au: "5.203 AU", type: "Planet" },
  { id: "saturn", name: "Saturn", au: "9.539 AU", type: "Planet" },
  { id: "uranus", name: "Uranus", au: "19.18 AU", type: "Planet" },
  { id: "neptune", name: "Neptune", au: "30.06 AU", type: "Planet" },
  { id: "pluto", name: "Pluto", au: "39.5 AU", type: "Dwarf planet" },
];

const SolarSystem = () => {
  return (
    <div>
      <div className="logo">Solar System</div>
      {planets.map((planet, index) => (
        <React.Fragment key={planet.id}>
          <input
            className={`planet${9 - index}`}
            id={planet.id}
            type="radio"
            name="planet"
            defaultChecked={planet.id === "mars"}
          />
          <label className={`menu ${planet.id}`} htmlFor={planet.id}>
            <div className="preview"></div>
            <div className="info">
              <h2>
                <div className="pip"></div>
                {planet.name}
              </h2>
              <h3>{planet.au}</h3>
            </div>
          </label>
        </React.Fragment>
      ))}
      <div className="solar">
        {planets.reverse().map((planet, index) => (
          <React.Fragment key={planet.id}>
            <div className="solar_systm" key={planet.id}>
              <div className={`planet ${planet.id}`}>
                <div className={`planet_description ${planet.id}`}>
                  <h2>{planet.type}</h2>
                  <h1>{planet.name}</h1>
                </div>
                <div className="overlay"></div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SolarSystem;
