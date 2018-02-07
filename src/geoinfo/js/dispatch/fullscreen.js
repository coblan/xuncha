export function fullscreen(){
    $('#menu').hide()
    $('.map-btn-panel').hide()
    $('#head').hide()
    $('.breadcrumb').hide()
    $('#footer').hide()
    $('.btn-panel').hide()
}
function exit_fullscreen(){
    $('#menu').show()
    $('.map-btn-panel').show()
    $('#head').show()
    $('.breadcrumb').show()
    $('#footer').show()
    $('.btn-panel').show()

}

window.fullscreen = fullscreen
window.exit_fullscreen=exit_fullscreen