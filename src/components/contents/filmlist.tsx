import React from "react";
import { useRouter } from "next/router";

const Filmlist: React.FC = () => {
  const router = useRouter();
  const { categories } = router.query;

  const transToSlug = (str: string) => {
    return str
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .toLowerCase(); 
  };

  const translatedCategory = categories 
    ? transToSlug(decodeURIComponent(categories.toString())) 
    : '';

  return (
    <>
      <h1>{translatedCategory}</h1>
    </>
  );
}

export default Filmlist;
