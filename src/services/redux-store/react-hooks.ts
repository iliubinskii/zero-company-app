import type { UseAppDispatch, UseAppSelector } from "./types";
import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch: UseAppDispatch = useDispatch;

export const useAppSelector: UseAppSelector = useSelector;
