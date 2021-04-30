import "./globals.ts"
import { handleFileChange } from "./helpers/functions.ts"

const watchingEvents = ["modify", "create"]
let reloading = false

 export default async (pw:AsyncIterableIterator<Deno.FsEvent>, iw:AsyncIterableIterator<Deno.FsEvent>) => {
    pageWatcher(pw)
    includesWatcher(iw)
}


async function pageWatcher(watcher:AsyncIterableIterator<Deno.FsEvent>) {
    for await (const event of watcher) {
        if (watchingEvents.includes(event.kind) && !reloading) {
            reloading = true
            const filepath = event.paths[0]
            handleFileChange(filepath)
            setTimeout(() => (reloading = false), 500);
        }        
      } 
}


async function includesWatcher(watcher:AsyncIterableIterator<Deno.FsEvent>) {
    for await (const event of watcher) {
        if (watchingEvents.includes(event.kind) && !reloading) {
            reloading = true
            const filepath = event.paths[0]
            console.log("\nincluded file changed, updating all pages.....\n")
            handleIncludedChange(filepath)
            setTimeout(() => (reloading = false), 500);
        }        
      } 
}


 function handleIncludedChange(path: string): void {
    const filetype = path.split(".").slice(-1).pop()
    const basePaths = window.watched.pages.map((basePath) => {
        basePath = Deno.cwd() + "/" + basePath
        console.log(basePath)
        return basePath
    })    

    basePaths.forEach((dir)=> {
        const dircontent = Deno.readDirSync(dir)
        for (const file of dircontent) {
            if(file.isFile && file.name.split(".").slice(-1).pop() == filetype) {
                const mainFile = dir + "" + file.name
                console.log(mainFile)
                handleFileChange(mainFile)
            }
        }
    })
}


