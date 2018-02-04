export function fullscreen(){
    $('#menu').hide()
    $('.map-btn-panel').hide()
    $('#head').hide()
}
function exit_fullscreen(){
    $('#menu').show()
    $('.map-btn-panel').show()
    $('#head').show()
}

window.fullscreen = fullscreen
window.exit_fullscreen=exit_fullscreen