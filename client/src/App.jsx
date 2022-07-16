import StaticContext from "./context/StaticContext";
import { TodosContextProvider } from "./context/TodosContext";

import Todos from "./components/Todos";
import Form from "./components/Form";

import logo from "./img/logo.png";

const App = () => {
  return (
    <>
      <StaticContext.Provider
        value={{
          todos: ["cc", "dd"],
        }}
      >
        <header>
          <h1>App</h1>
          <img src={logo} alt="logo" />
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
