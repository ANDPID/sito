$(document).ready(() => {
    page = document.title.split("-")[0]
    $("body").append("<div id='intro' style='text-align: center; display: none;color: white; position: fixed; left: 0; top: 0;width: 100vw; height:100vh; background-color: black'> <p style='text-align: center;padding-top: 45vh; margin: auto'> Questo \u00E8 il sito dell'ANDPID, state per leggere il contenuto della pagina: "+ page +"</p> </div>")
    $("#intro").fadeIn()
    setTimeout(() => {   
        $("#intro").fadeOut()
    }, 1000)
})