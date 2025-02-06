import { StartDB } from "./db/client"
import { StartServer } from "./server"

const loadProgram = async () => {
  try {
    await StartDB()
    await StartServer()
  } catch (err) {
    throw new Error(`failed to load program: ${err}`)
  }
}

export default loadProgram