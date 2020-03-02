import { Materia } from '../materia/materia';

export class Professore {
    nome: string;
    cognome: string;
    materia: Materia;
    sesso: string;
    telefono: string;
    codiceFisc: string;
    note: string[] = [];
    pagaOra: number;
}