import type { UseAppDispatch, UseAppSelector, UseAppStore } from "./types";
import { useDispatch, useSelector, useStore } from "react-redux";

export const useAppDispatch: UseAppDispatch = useDispatch;

export const useAppSelector: UseAppSelector = useSelector;

export const useAppStore: UseAppStore = useStore;
