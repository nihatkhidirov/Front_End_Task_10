$(document).ready(function () {
  function getWeatherData(location) {
    return $.ajax({
      url: `https://api.weatherapi.com/v1/current.json?key=6bc15cfb31414fbda9f95625221905&q=${location}`,
      method: "GET",
    });
  }

  function displayWeatherData(location, data) {
    var weatherInfo = `
                <h2>Weather in ${
                  location.charAt(0).toUpperCase() + location.slice(1)
                }:</h2>
                <p>Temperature: ${data.current.temp_c} °C</p>
                <p>Condition: ${data.current.condition.text}</p>
                <p>Humidity: ${data.current.humidity} %</p>
                <p>Wind: ${data.current.wind_kph} kph</p>
            `;
    $("#weather-info").html(weatherInfo);
  }

  $("#get-weather-btn").click(function () {
    var location = $("#location-input").val().trim().toUpperCase();
    if (location) {
      getWeatherData(location)
        .done(function (data) {
          displayWeatherData(location, data);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.error(
            `Error fetching data for ${location}: ${textStatus}`,
            errorThrown
          );
          $("#weather-info").html(
            `<p>Xeta Bas Verdi!!. <br>
            Daxil Etdiyiniz Seher- "${location}" Tapilmadi! <br>
              Zehmet Olmazsa, Yeniden Cehd Edin.</p>`
          );
        });
    } else {
      $("#weather-info").html("<p>Please enter a location.</p>");
    }
  });
});
