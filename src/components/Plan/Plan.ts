export interface IProduct {
    id: number;
    title: string;
    price: number;
    img: string;
    description: string[];
}

export const PlanBasico: IProduct = {
    id: 1,
    title: "Enseñas - Plan Básico",
    price: 15000,
    description: [
        "Acceso limitado a lecciones.",
        "10 lecciones por día.",
        "Niveles disponibles: Básico e Intermedio.",
        "Válido por 30 días."
    ],
    img: "/hot-air-balloon.png",
};

export const PlanPremium: IProduct = {
    id: 2,
    title: "Enseñas - Plan Premium",
    price: 100,
    description: [
        "Acceso ilimitado a lecciones.",
        "Todos los niveles disponibles.",
        "Válido por 30 días.",
    ],
    img: "/air-plane.png",
};