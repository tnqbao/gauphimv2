import { useRouter } from "next/router";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface GlobalContextType {
  eposide: number;
  page : number;
  changeEposide: (eposide: number) => void;
  changePage: (page: number) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [eposide, setEposide] = useState(1);
  const [page, setPage] = useState(1);

  const changeEposide = (eposide : number) => {
    setEposide(eposide)
    
  }

  const changePage = (page : number) => {
    setPage(page);
    router.push({
      pathname: router.pathname, 
      query: {
        ...router.query,          
        page: page.toString(),
      },
    });
  }


  return (
    <GlobalContext.Provider value={{ eposide, changeEposide, page, changePage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};