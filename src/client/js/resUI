// update the User interface

function resUI(startDate, endDate, theDiff, cityInfo, weatherInfo, imageInfo) {
  return `
    <div id="block">
      <p>
        Your trip to ${cityInfo.city} will start on ${startDate} until ${endDate} the length of your trip is ${theDiff} days , Your plane will land at ${cityInfo.airport}
      </p>
    </div>

    <div id="block">
      <h2> Here is an image of your destination city</h2>
      <img src="${imageInfo.hits[0].webformatURL}" alt="">
    </div>

    <div id="block">
      <h2>Weather foracsting in your trip dates will be</h2>
      <p>The highest will be: ${weatherInfo.data[0].max_temp}</p>
      <p>The lowest will be: ${weatherInfo.data[0].min_temp}</p>
    </div>
    `;
}

export { resUI };
