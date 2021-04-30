import { fs, Colors } from "../deps.ts"
import { Compiler, PugCompiler, SassCompiler } from "./Compiler.ts"


export function handleFileChange (filepath: string) : void  {
    let compiler : Compiler
    let outPath : string

    const filetype = filepath.split(".").slice(-1).pop()
    const page = filepath.split(/[\/|\\]/).slice(-1).pop()?.split(".")[0]
    const outFolder = Deno.cwd() + "/dist/" + ((page == "index") ? ("") : (page + "/"))

    outPath = outFolder + "index"

    switch(filetype) {
        case "scss": {
            compiler = new SassCompiler()
            outPath += ".css"
            break;
        }
        case "pug": {
            compiler = new PugCompiler()
            outPath += ".html"
            break;
        }
        default: {
            console.log("filetype "+ filetype + " doesn't match any compiler")
            return
        }
    }

    console.log("About to compile " + page + "." + filetype +" in file " + outPath + "...")

    Deno.readTextFile(filepath).then((inString) => {

        const outString = compiler.compile(inString, filepath)

        if(outString == "") {
            console.log("compilation resulted empty")
        }
        fs.ensureFileSync(outPath)

        Deno.writeTextFileSync(outPath, outString)

        console.log(Colors.green("compiled ") + page + "." + filetype + "\n")
    })

}

export function compileAll() {
    const basePaths = window.watched.pages.map((basePath) => {
        basePath = Deno.cwd() + "/" + basePath
        return basePath
    })

    console.log(basePaths)

    basePaths.forEach((dir)=> {
        const dircontent = Deno.readDirSync(dir)
        for (const file of dircontent) {
            if(file.isFile) {
                const mainFile = dir + "" + file.name
                handleFileChange(mainFile)
            }
        }
    })
}

