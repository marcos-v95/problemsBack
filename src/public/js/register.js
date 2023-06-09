const form = document.getElementById('registerForm')

form.addEventListener('submit', (evt) => {
  evt.preventDefault()
  let data = new FormData(form)
  let obj = {}
  data.forEach((value, key) => obj[key] = value)

  fetch("api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json"
    }
  })
  form.reset()
})
