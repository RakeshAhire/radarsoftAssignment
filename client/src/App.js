import "./App.css";
import AllRoutes from "./routes/AllRoutes";

function App() {
  const mode = "light";
  return (
    <div className={`theme ${mode}`}>
      <div className="max-w-[1366px] min-h-screen mx-auto px-6 flex flex-col justify-between">
        <AllRoutes />
      </div>
      
    </div>
  );
}

export default App;
