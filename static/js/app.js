const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1') 
const message2 = document.querySelector('#msg2')
const myWeatherButton = document.querySelector('#my-weather')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`/weather?adress=${encodeURIComponent(location)}`).then( (response) => {
        response.json().then((data) => {
            if(data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})

myWeatherButton.addEventListener('click', (e) => {
    e.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }

        fetch(`/myweather?latitude=${coords.latitude}&longitude=${coords.longitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message1.textContent = data.location
                    message2.textContent = data.forecast
                }
            })
        })
    })
})