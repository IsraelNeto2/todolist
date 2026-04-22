export interface Task {
    id: string;
    descricao: string;
    data: string;
    status: "completo" | "pendente" | "cancelado";
}