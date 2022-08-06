import './style.css';

const posts = document.getElementById('posts');
const titleInput = document.getElementById('blog-title');
const boduInput = document.getElementById('blog-body');
const form = document.getElementById('form');

let postsArr = [];

function renderPosts(arr) {
  let html = '';
  for (let post of arr) {
    html += `
      <h4>${post.title}</h4>
      <p>${post.body}</p>
      <hr>
    `;
  }
  posts.innerHTML = html;
}

fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json())
  .then((data) => {
    postsArr = data.slice(0, 5);
    renderPosts(postsArr);
  });

document.getElementById('post-btn').addEventListener('click', function (e) {
  e.preventDefault();
  const req = {
    title: titleInput.value,
    body: boduInput.value,
  };

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      postsArr.unshift(data);
      renderPosts(postsArr);
      form.reset();
    });
});
