import { server, fs, Colors } from "../deps.ts";

export default async (server:server.Server) => {
    console.log(`\n---------------------------------------------------------------\nHTTP webserver running.  Access it at:  http://localhost:8080/\n---------------------------------------------------------------\n`);
    for await (const request of server) {
        if(request.method == "GET") {
            try {
                customGet(request)
            } catch(e) {
                console.error(e)
            }
        }
    }
}

function readDocument(filepath : string): Uint8Array {
    console.log("Reading " + Deno.cwd() + filepath + "...\n")
    return Deno.readFileSync(Deno.cwd() + filepath)
}

function elaborateUrl(url : string) : {path : string, args : string[] | undefined} {
    console.log("--------------\nInterpreting url  " + url + "...\n")
    let path = url.split("?")[0]
    let args : "" | string[] | undefined
    args = (url.split("?")[1] && url.split("?")[1].split("&"))
    args = args === "" ? undefined : args
    console.log(Colors.bold("filepath: ") + path + Colors.bold("\nargs: ") + (args || "none"))
    let objectUrl : {path : string, args : string[] | undefined} = {path, args}
    return objectUrl
}

const customGet = (request : server.ServerRequest) => {
    let url = elaborateUrl(request.url)
    let filepath = "/dist" + url.path

    console.log(Colors.bold("method: ") + request.method + "\n")

    const isFile = filepath.includes(".")
    let extension : string
    let isHTML = true
    let isImage = false
    let isVideo = false
    let isAudio = false

    if(isFile) {
        extension = filepath.split(".").slice(-1).pop()!
        isHTML = ( extension === "html")
        isImage = ( window.imageExtensions.includes(extension))
        if(isImage) {
            extension = extension.toLowerCase()=="png" ? "png" : "jpeg"
        }
        isVideo = ( window.videoExtensions.includes(extension))
        isAudio = ( window.audioExtensions.includes(extension))
    }

    filepath += !isFile && '/index.html' || ''

    fs.exists("."+filepath).then((result : boolean) => {
        if(result) {
            try {
                const response = readDocument("/." + filepath)
                const headers = new Headers()
                const status = response && 200 || 500
                const body = response || "Internal Server Error"
                const contentType = (isHTML && "text") || (isAudio && "audio" || isImage && "image" || isVideo && "video") + "/" + extension

                headers.set('content-type', contentType)

                request.respond({ headers, status, body })
        }
        catch(e) {
            throw(e)
        }
        } else {
            request.respond({ status: 404, body: "not found" });
        }
    })
}