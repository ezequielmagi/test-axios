const apiKey = '602d2a09d70c4c7b811221334231811'

const locacionInputCity = document.getElementById('locacionCiudad')
const containerClima = document.getElementById('containerClima')
const locacionInputProvince = document.getElementById('locacionProvincia')
const btnBuscar = document.getElementById('btn-buscar')
const temperaturaLabel = document.getElementById('temperatura')
const descripcionLabel = document.getElementById('descripcion')
const iconoClima = document.getElementById('icono-clima')

btnBuscar.addEventListener('click', buscarDatosClima)

function buscarDatosClima() {
  const locacionCity = locacionInputCity.value;
  const locacionProvince = locacionInputProvince.value;
  //realizamos la solicitud del clima a la api
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&lang=es&q=${encodeURIComponent(locacionCity)},${encodeURIComponent(locacionProvince)}`)
    .then( response => response.json() )
    .then(data => {
      const{ location , current } = data
      const temperatura = current.temp_c

      containerClima.classList.remove('hide')
      temperaturaLabel.textContent = `${temperatura} °C`
      descripcionLabel.textContent = `El clima en ${location.name}, ${location.region} es ${current.condition.text}`

      const codigoIcono = current.condition.icon
      const urlIcono = `https:${codigoIcono}`
      iconoClima.setAttribute('src', urlIcono)
      iconoClima.setAttribute('alt', current.condition.text)
    })
    .catch(error => {
      console.log('error al obtener los datos del clima: ', error)
    })
}