import StaticContext from "./context/StaticContext";
import { TodosContextProvider } from "./context/TodosContext";

import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import Form from "./components/Form";

import "./main.css";

const App = () => {
  return (
    <>
      <StaticContext.Provider
        value={{
          todos: ["cc", "dd"],
        }}
      >
        <header>
          <Navbar />
        </header>
      </StaticContext.Provider>
      <TodosContextProvider>
        <main>
          <div id="container">
            <Todos />
            <Form />
          </div>
        </main>
      </TodosContextProvider>
    </>
  );
};

export default App;
