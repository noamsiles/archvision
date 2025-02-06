import loadProgram from "./loader"
import hookExit from "./shutdown"

await loadProgram()
await hookExit()