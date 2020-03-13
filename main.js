window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/40b77bee8e7afb15f5d20a8c09ce6295/${lat},${long}
      `;
      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //   Set DOM elements from the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // Set Icon
          setIcons(icon, document.querySelector(".icon"));
          let celsius = Math.round((temperature - 32) * (5 / 9));
          // Change Unit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F°") {
              temperatureSpan.textContent = "C°";
              temperatureDegree.textContent = celsius;
            } else {
              temperatureSpan.textContent = "F°";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = "consider turning on location thank u";
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
