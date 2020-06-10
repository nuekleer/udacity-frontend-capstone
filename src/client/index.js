require('./favicon.ico')
import { postData } from './js/functions'
import { postWeather } from './js/functions'
import { postPix } from './js/functions'
import { showData } from './js/functions'
import { handleSubmit } from './js/app.js'
import { handleShowForm } from './js/app.js'
import { removeTrip } from './js/app.js'
import { init } from './js/app.js'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/footer.scss'

export {
    postData,
    postWeather,
    postPix,
    showData,
    handleSubmit,
    handleShowForm,
    removeTrip,
    init
}