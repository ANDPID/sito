$(document).ready(() => {
    sections = ["", "notizie", "chi-siamo", "app"];    
    section = document.URL.split("/").slice(-1).pop();
    console.log(section);
    if(sections.includes(section)) {
        console.log();
        index = (sections.indexOf(section)+1)%sections.length
        nextSection = sections[index]
        console.log(nextSection)
        document.addEventListener('keyup', changePage);
    }
})
changePage = (e) => {   
    console.log(e.code)
    if(e.code == "Tab") {
        window.location.href="/"+nextSection
    }
    if(e.code == "KeyA") {
        window.location.href="/app"
    }
    if(e.code == "KeyC") {
        window.location.href="/chi-siamo"
    }
    if(e.code == "KeyN") {
        window.location.href="/notizie"
    }
}
