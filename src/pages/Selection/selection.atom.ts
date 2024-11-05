import {Atom, atom} from 'jotai';
import axios from 'axios';
import {SelectionInfoResponse} from "./selection.types.ts";
import './selection.mock.ts'
import {http} from "../../shared/http.ts";

// Атом состояния для данных подборки
export const selectionInfoAtom:Atom<Promise<SelectionInfoResponse|null>> = atom(async () => {
    debugger
    try {
        const response = await http.get('/selection/get');
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных о подборке:', error);
        return null; // Можно вернуть null или объект ошибки
    }
});
