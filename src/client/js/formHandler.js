const handleSubmit = async (event) => {
  event.preventDefault();

  // check what text was put into the form field
  const cityD = document.getElementById('city').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const tStart = new Date(startDate);
  const tEnd = new Date(endDate);
  const theDiff = (tEnd.getTime() - tStart.getTime()) / (1000 * 3600 * 24);
  // to make sure the city is not empity
  if (cityD === '') {
    alert('Please enter vaild city name');
    return;
  }

  console.log('::: Form Submitted :::');

  // Global variable to store data
  let cityInfo = {};
  let weatherInfo = {};
  let imageInfo = {};

  const resGeo = await fetch('http://localhost:8082/geonames', {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city: cityD }),
  });

  try {
    const newDataGeo = await resGeo.json();
    cityInfo = {
      city: newDataGeo.geonames[0].name,
      airport: newDataGeo.geonames[1].name,
      lat: newDataGeo.geonames[0].lat,
      lon: newDataGeo.geonames[0].lng,
    };
  } catch (error) {
    console.log('error', error);
  }

  // using Weather api

  const resWeatherbit = await fetch('http://localhost:8082/weatherbit', {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cityInfo),
  });

  try {
    weatherInfo = await resWeatherbit.json();
    console.log('we have received weather data :', weatherInfo);
  } catch (error) {
    console.log('error', error);
  }

  // usign Pixleby api
  const resPixabay = await fetch('http://localhost:8082/pixabay', {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cityInfo),
  });

  try {
    imageInfo = await resPixabay.json();
    console.log('we have received photo data :', imageInfo);
  } catch (error) {
    console.log('error', error);
  }

  const results = document.getElementById('yourTrip');
  results.innerHTML = Client.resUI(
    startDate,
    endDate,
    theDiff,
    cityInfo,
    weatherInfo,
    imageInfo
  );
};

export { handleSubmit };
