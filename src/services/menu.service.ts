import { Injectable, signal } from '@angular/core';

export interface Dish {
  id: number;
  category: 'antipasti' | 'primi' | 'secondi' | 'dolci';
  name: string;
  description: string;
  price: number;
  tags: ('vegetarian' | 'gluten-free')[];
  isSignature?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems = signal<Dish[]>([
    {
      id: 1,
      category: 'antipasti',
      name: 'Carpaccio di Manzo',
      description: 'Fines tranches de bœuf cru, roquette, parmesan affiné 24 mois, huile de truffe.',
      price: 24,
      tags: ['gluten-free']
    },
    {
      id: 2,
      category: 'antipasti',
      name: 'Burrata al Tartufo',
      description: 'Burrata crémeuse des Pouilles, tomates datterini confites, éclats de truffe noire.',
      price: 22,
      tags: ['vegetarian', 'gluten-free']
    },
    {
      id: 3,
      category: 'primi',
      name: 'Tagliolini al Tartufo Bianco',
      description: 'Pâtes fraîches maison, beurre de sauge, truffe blanche d\'Alba (selon saison).',
      price: 38,
      tags: ['vegetarian'],
      isSignature: true
    },
    {
      id: 4,
      category: 'primi',
      name: 'Risotto ai Frutti di Mare',
      description: 'Riz Carnaroli, bouillon de crustacés, gambas, calamars, palourdes, zeste de citron.',
      price: 32,
      tags: ['gluten-free']
    },
    {
      id: 5,
      category: 'secondi',
      name: 'Osso Buco alla Milanese',
      description: 'Jarret de veau braisé au vin blanc, gremolata, servi avec un risotto au safran.',
      price: 42,
      tags: []
    },
    {
      id: 6,
      category: 'secondi',
      name: 'Branzino al Cartoccio',
      description: 'Filet de bar cuit en papillote, olives taggiasche, câpres, tomates cerises, pommes de terre.',
      price: 36,
      tags: ['gluten-free']
    },
    {
      id: 7,
      category: 'dolci',
      name: 'Tiramisù della Nonna',
      description: 'La recette traditionnelle : mascarpone, café espresso, biscuits savoiardi, cacao amer.',
      price: 14,
      tags: ['vegetarian']
    },
    {
      id: 8,
      category: 'dolci',
      name: 'Panna Cotta al Basilico',
      description: 'Panna cotta infusée au basilic frais, coulis de fraises des bois.',
      price: 12,
      tags: ['vegetarian', 'gluten-free']
    }
  ]);

  getMenu() {
    return this.menuItems;
  }
}