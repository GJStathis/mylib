import { createContext } from "react";
import { LibraryDispatchContext } from "../../types/interfaces";

export const BooksDispatchContext = createContext<LibraryDispatchContext>(undefined!);
