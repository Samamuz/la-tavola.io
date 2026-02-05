import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, Dish } from '../../services/menu.service';
import { SectionTitleComponent } from '../../components/ui/section-title.component';
import { AppearDirective } from '../../directives/appear.directive';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, AppearDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pt-32 pb-20 bg-bg-white min-h-screen">
      <div class="max-w-5xl mx-auto px-6">
        <app-section-title title="La Carte" subtitle="Saison Printemps"></app-section-title>

        <!-- Filters -->
        <div class="flex flex-wrap justify-center gap-4 mb-16" appAppear>
          @for (filter of filters; track filter.id) {
            <button 
              (click)="activeFilter.set(filter.id)"
              [class.bg-brand-terracotta]="activeFilter() === filter.id"
              [class.text-white]="activeFilter() === filter.id"
              [class.border-brand-terracotta]="activeFilter() === filter.id"
              [class.text-text-charcoal]="activeFilter() !== filter.id"
              class="px-6 py-2 border rounded-full text-sm font-medium transition-all duration-300 hover:border-brand-terracotta hover:text-brand-terracotta hover:bg-transparent"
              [class.hover:text-white]="activeFilter() === filter.id"
              [class.hover:bg-brand-terracotta]="activeFilter() === filter.id">
              {{ filter.label }}
            </button>
          }
        </div>

        <!-- Menu Sections -->
        <div class="space-y-20">
          @if (activeFilter() === 'all' || activeFilter() === 'antipasti') {
            <section appAppear>
              <h3 class="text-3xl font-serif text-center mb-10 italic text-brand-olive">Antipasti</h3>
              <div class="grid md:grid-cols-2 gap-x-12 gap-y-10">
                @for (dish of antipastiDishes(); track dish.id) {
                  <div class="group">
                    <div class="flex justify-between items-baseline mb-2 border-b border-gray-200 pb-2 group-hover:border-brand-gold transition-colors duration-300">
                      <h4 class="text-xl font-serif text-text-charcoal font-medium">{{ dish.name }}</h4>
                      <span class="text-lg font-serif text-brand-terracotta">{{ dish.price }}€</span>
                    </div>
                    <p class="text-text-grey font-light text-sm leading-relaxed">{{ dish.description }}</p>
                    <div class="flex gap-2 mt-2">
                       @if(dish.tags.includes('vegetarian')) { <span class="text-[10px] uppercase tracking-wider text-brand-olive border border-brand-olive px-1 rounded">Végétarien</span> }
                       @if(dish.tags.includes('gluten-free')) { <span class="text-[10px] uppercase tracking-wider text-brand-gold border border-brand-gold px-1 rounded">Sans Gluten</span> }
                    </div>
                  </div>
                }
              </div>
            </section>
          }

          @if (activeFilter() === 'all' || activeFilter() === 'primi') {
            <section appAppear>
              <h3 class="text-3xl font-serif text-center mb-10 italic text-brand-olive">Primi Piatti</h3>
              <div class="grid md:grid-cols-2 gap-x-12 gap-y-10">
                @for (dish of primiDishes(); track dish.id) {
                  <div class="group">
                    <div class="flex justify-between items-baseline mb-2 border-b border-gray-200 pb-2 group-hover:border-brand-gold transition-colors duration-300">
                      <h4 class="text-xl font-serif text-text-charcoal font-medium">{{ dish.name }}</h4>
                      <span class="text-lg font-serif text-brand-terracotta">{{ dish.price }}€</span>
                    </div>
                    <p class="text-text-grey font-light text-sm leading-relaxed">{{ dish.description }}</p>
                     <div class="flex gap-2 mt-2">
                       @if(dish.tags.includes('vegetarian')) { <span class="text-[10px] uppercase tracking-wider text-brand-olive border border-brand-olive px-1 rounded">Végétarien</span> }
                       @if(dish.tags.includes('gluten-free')) { <span class="text-[10px] uppercase tracking-wider text-brand-gold border border-brand-gold px-1 rounded">Sans Gluten</span> }
                    </div>
                  </div>
                }
              </div>
            </section>
          }

          @if (activeFilter() === 'all' || activeFilter() === 'secondi') {
            <section appAppear>
              <h3 class="text-3xl font-serif text-center mb-10 italic text-brand-olive">Secondi Piatti</h3>
              <div class="grid md:grid-cols-2 gap-x-12 gap-y-10">
                @for (dish of secondiDishes(); track dish.id) {
                  <div class="group">
                     <div class="flex justify-between items-baseline mb-2 border-b border-gray-200 pb-2 group-hover:border-brand-gold transition-colors duration-300">
                      <h4 class="text-xl font-serif text-text-charcoal font-medium">{{ dish.name }}</h4>
                      <span class="text-lg font-serif text-brand-terracotta">{{ dish.price }}€</span>
                    </div>
                    <p class="text-text-grey font-light text-sm leading-relaxed">{{ dish.description }}</p>
                     <div class="flex gap-2 mt-2">
                       @if(dish.tags.includes('vegetarian')) { <span class="text-[10px] uppercase tracking-wider text-brand-olive border border-brand-olive px-1 rounded">Végétarien</span> }
                       @if(dish.tags.includes('gluten-free')) { <span class="text-[10px] uppercase tracking-wider text-brand-gold border border-brand-gold px-1 rounded">Sans Gluten</span> }
                    </div>
                  </div>
                }
              </div>
            </section>
          }

          @if (activeFilter() === 'all' || activeFilter() === 'dolci') {
            <section appAppear>
              <h3 class="text-3xl font-serif text-center mb-10 italic text-brand-olive">Dolci</h3>
              <div class="grid md:grid-cols-2 gap-x-12 gap-y-10">
                @for (dish of dolciDishes(); track dish.id) {
                  <div class="group">
                     <div class="flex justify-between items-baseline mb-2 border-b border-gray-200 pb-2 group-hover:border-brand-gold transition-colors duration-300">
                      <h4 class="text-xl font-serif text-text-charcoal font-medium">{{ dish.name }}</h4>
                      <span class="text-lg font-serif text-brand-terracotta">{{ dish.price }}€</span>
                    </div>
                    <p class="text-text-grey font-light text-sm leading-relaxed">{{ dish.description }}</p>
                     <div class="flex gap-2 mt-2">
                       @if(dish.tags.includes('vegetarian')) { <span class="text-[10px] uppercase tracking-wider text-brand-olive border border-brand-olive px-1 rounded">Végétarien</span> }
                       @if(dish.tags.includes('gluten-free')) { <span class="text-[10px] uppercase tracking-wider text-brand-gold border border-brand-gold px-1 rounded">Sans Gluten</span> }
                    </div>
                  </div>
                }
              </div>
            </section>
          }
        </div>
      </div>
    </div>
  `
})
export class MenuComponent {
  private menuService = inject(MenuService);
  menu = this.menuService.getMenu();
  
  activeFilter = signal<string>('all');
  
  filters = [
    { id: 'all', label: 'Tout voir' },
    { id: 'antipasti', label: 'Antipasti' },
    { id: 'primi', label: 'Primi' },
    { id: 'secondi', label: 'Secondi' },
    { id: 'dolci', label: 'Dolci' }
  ];

  // Computed signals prevent recalculation on every cycle
  antipastiDishes = computed(() => this.menu().filter(d => d.category === 'antipasti'));
  primiDishes = computed(() => this.menu().filter(d => d.category === 'primi'));
  secondiDishes = computed(() => this.menu().filter(d => d.category === 'secondi'));
  dolciDishes = computed(() => this.menu().filter(d => d.category === 'dolci'));
}