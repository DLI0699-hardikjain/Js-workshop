const users = JSON.parse(localStorage.getItem('users')) || [];
const container = document.querySelector('#feedback-cards-container');
users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h3>${user.name}</h3>
        <p>Rating: ${user.rating} ${user.rating > 1 ? 'stars' : 'star'}</p>
        <p>${user.feedback}</p>
    `;
    container.appendChild(card);
});

if(users.length === 0) document.selectElementById('feedback-cards-container').innerHTML = '<h3>No feedbacks yet</h3>';

$(document).ready(function() {
    $("form").submit(function(e) {
  e.preventDefault();
    const name = $('#name').val();
    const rating = $('input[name="rating"]:checked').val();
    const feedback = $('#feedback').val();
    const oldUsers = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...oldUsers, { name, rating, feedback }]));
  showThankyou(rating, name);
    setTimeout(() => {
        window.location.reload();
    }, 3000);
})});

function showThankyou(val, name) {
  $('.panel').html(`
    <span class="fa-heart"></span>
    <h1>${name}</h1>
    <br>
    <strong>Feedback: ${val} ${val > 1 ? 'stars' : 'star'}</strong>
    <p>Thank You For Feedback.</p>
  `);
}

function handleChange() {
  const inputRatings = document.querySelectorAll('input[name="rating"]');
  const submitBtn = document.querySelector('input[type="submit"]');
  inputRatings.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked === true) {
        submitBtn.disabled = false;
      }
    })
  })
}

handleChange();