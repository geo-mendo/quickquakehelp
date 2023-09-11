import { Toaster } from "react-hot-toast"
import { AppRouter } from "./router/AppRouter"



function App() {

  return (
    <div className="w-full h-full overflow-scroll">
      <AppRouter/>
      <Toaster />
    </div>
  )
}

export default App
