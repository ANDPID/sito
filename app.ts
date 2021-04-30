import { server } from "./deps.ts"
import  serve from "./server/index.ts";
import watch from "./watcher.ts"
import { compileAll } from "./helpers/functions.ts"

import "./globals.ts"

window.watched = {
    pages: ["pug/", "style/" ],
    includes: ["pug/includes/"]
}

window.imageExtensions = ["jpeg", "jpg", "png", "JPG"]
window.videoExtensions = ["mp4", "webm"]
window. audioExtensions = ["mp3"]

if (Deno.args.includes("compile") || Deno.args.includes("dev")) {
    compileAll()
}

if (Deno.args.includes("serve") || Deno.args.includes("dev")) {
    const s = server.serve({ port: 8080}) //server
    serve(s)
}

if(Deno.args.includes("dev")) {
    const pw = Deno.watchFs(window.watched.pages,{recursive: false}); //file events watcher for main files
    const iw = Deno.watchFs(window.watched.includes,{recursive: false}); //file events watcher for included files
    watch(pw, iw)
}
