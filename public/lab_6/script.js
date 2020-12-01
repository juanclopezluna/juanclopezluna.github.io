// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(org, comparison, key) {
  if (org[key] < comparison[key]) {
    return -1;
  } if (org[key] > comparison[key]) {
    return 1;
  }
  return 0;
}

function Randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

document.body.addEventListener('submit', async (evt) => {
  evt.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(evt.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const arr1 = range(10);
      const arr2 = arr1.map(() => {
        const number = Randomize(0, 243);
        return fromServer[number];
      });
      
      const reverseList = arr2.sort((a,b) => sortFunction(b,a,'name'));
      const orderedlst = document.createElement('ol');
      orderedlst.className = 'flex-inner';
      $('form').prepend(orderedlst);

      reverseList.forEach((el, i) => {
        const li = document.createElement("li");
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(li).append(`<label for=${el.code}>${el.name}</label>`);
        $(orderedlst).append(li);
      
      });
    })
    .catch((err) => {
      console.log(err)
      // set fave to no
    });
});