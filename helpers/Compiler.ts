import { pug, sass } from "../deps.ts";

export interface Compiler {

    compile(inString: string, filePath: string) : string;

    
}

export class PugCompiler implements Compiler {
    compile(pugString:string, filePath: string) : string {
        console.log("Compiling pug file ...")
        const htmlString = pug.compile(pugString, {filename: filePath, pretty: true})();
        return htmlString
    }
}

export class SassCompiler implements Compiler {
    compile(sassString:string, filePath?: string) : string {   
        if(sassString == "") {
            console.error("Sass file reading resulted empty")
            console.log(sassString)
            return ""
        }
        console.log("Compiling sass file...")
        try {
            const cssString = sass.compile(sassString);
            return cssString
        } catch (e) {
            console.error(e)
            console.log(e)
            return ""
        }
    }
}