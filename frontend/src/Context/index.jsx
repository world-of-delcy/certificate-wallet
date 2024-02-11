import { BrowserRouter } from "react-router-dom";
import UserProvider from "./User";

function Context({ children }) {
  return (
    <BrowserRouter>
      <UserProvider>{children}</UserProvider>
    </BrowserRouter>
  );
}

export default Context;
