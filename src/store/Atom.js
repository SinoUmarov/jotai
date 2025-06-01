import { atom } from "jotai";

export const animeAtom = atom([
  { name: "ali", age: 12, complete: true, id: 1 },
  { name: "Muhammad", age: 14, complete: false, id: 2 },
  { name: "abubakr", age: 17, complete: true, id: 5 },
]);

export const openAtom = atom(false);
export const open1Atom = atom(false);
export const infoUserAtom = atom(null);
export const addNameAtom = atom("");
export const addAgeAtom = atom("");
export const editUserAtom = atom(null);
export const editNameAtom = atom("");
export const editAgeAtom = atom("");
export const openEditAtom = atom(false);
export const searchs = atom("");
