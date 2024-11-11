
export interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl: any[];
    price: number,
    userId: string; // Add the userId property to the Post interface
    username?: string;
    categoryId: string;// Add categoryId property
    categoryName: string; // Add categoryName property
    localisation: string;

}
export const LOCALISATIONS: string[] = [
    'Tunis',
    'Ariana',
    'Sousse',
    'Mahdia',
    'Ben Arous',
    'Monastir',
    'Gbelli',
    'Gafsa',
    'Jandouba',
    'Sfax',
    'Kairouen',
    'Seliana',
    'Zaghouane',
    'Nabeul',
    'Tataouin',
    'Touzer',
    'Mednin',
    'Sidi Bouzid',
    'Gabes',
    'Kef',
    'Kassrine',
    'Baje',
    'Zarzis',
    'Bizzert',
];