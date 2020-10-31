function convertRestaurantsToCategories(restaurantList) {
  const newArray = [];
  const result = {};
  for (let i = 0; i < restaurantList.length; i += 1) {
    newArray.push(restaurantList[i].category);
  }
  for (let i = 0; i < newArray.length; i += 1) {
    if (!result[newArray[i]]) {
      result[newArray[i]] = 0;
    }
    result[newArray[i]] += 1;
  }
  const list = Object.keys(result).map((category) => ({
    y: result[category],
    label: category
  }));

  return list;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  
  CanvasJS.addColorSet('customColorSet1', [
                      "#2F4F4F",
                      "#008080",
                      "#2E8B57",
                      "#3CB371",
                      "#90EE90"                
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 5,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Resturants by Category',
      labelFontSize: 12,
      scaleBreaks: {
        customBreaks: [{
          startValue: 40,
          endValue: 50,
          color: 'red',
          type: 'zigzag' },
        {
          startValue: 85,
          endValue: 100,
          color: 'red',
          type: 'wavy' },
        {
          startValue: 160,
          endValue: 175,
          color: 'red',
          type: 'zigzag' }]
      },
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});