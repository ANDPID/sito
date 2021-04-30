import { Colors } from "./deps.ts";

declare global {
    interface Window {
        imageExtensions: string[]
        videoExtensions: string[]
        audioExtensions: string[]
        watched: {
            pages: string[]
            includes: string[]
        }
    }
}

console.error = function(txt) {
    console.log(
        Colors.red("[ERROR] ") + txt
    )
}


export {}