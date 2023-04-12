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
});

function fetchToys() {
  fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
  .then(data => renderToys(data))
}

function renderToys(toys) {
  const card = document.querySelector('.container');
  toys.forEach(toy => {
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
    button.textContent = 'Like';
    button.className = 'like-btn';
    button.id = toy.id;
    div.append(h2, img, p, button);
  })
}