let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys();
  addNewToy();
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => toys.forEach(toy => renderToys(toy)))
}

function renderToys(toy) {
  const card = document.querySelector('#toy-collection');
  const div = document.createElement('div');
  div.className = 'card';
  card.append(div);
  const h2 = document.createElement('h2');
  h2.textContent = toy.name;
  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';
  const p = document.createElement('p');
  p.textContent = `${toy.likes} likes`;
  const button = document.createElement('button');
  button.textContent = 'Like  👍🏻';
  button.className = 'like-btn';
  button.id = toy.id;
  div.append(h2, img, p, button);

  button.addEventListener('click', () => {
    p.textContent = (parseInt(p.textContent) + 1) + ' ' + 'likes';
    fetch(`http://localhost:3000/toys/${button.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: p.textContent
      })
    })
    .then(response => response.json())
    .then(data => data)
  })
  p.textContent = `${toy.likes}`;
}

function addNewToy() {
  let getForm = document.querySelector('.add-toy-form');
  let inputText = document.querySelectorAll('.input-text');
  getForm.addEventListener('submit', (e) => {
    fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      id: '',
      name: inputText[0].value,
      image: inputText[1].value,
      likes: 0 + ' ' + 'likes',
    })
  })
  .then(response => response.json())
  .then(data => renderToys(data))
  e.target.reset();
  });
}