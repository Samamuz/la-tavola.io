import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/ui/button.component';
import { SectionTitleComponent } from '../../components/ui/section-title.component';
import { AppearDirective } from '../../directives/appear.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, SectionTitleComponent, AppearDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section -->
    <section class="relative h-screen w-full overflow-hidden flex flex-col">
      <div class="absolute inset-0 bg-black/30 z-10"></div>
      <div class="absolute inset-0">
         <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2940&auto=format&fit=crop" 
              alt="Restaurant Interior" 
              class="w-full h-full object-cover animate-pulse-slow"
              style="animation-duration: 20s; transform-origin: center;">
      </div>
      
      <!-- Main Content centered automatically by margin-auto in flex container -->
      <div class="relative z-20 m-auto text-center px-4 max-w-4xl">
        <span class="block text-white text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-6 animate-fade-in-up">
          Benvenuti a
        </span>
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 italic drop-shadow-lg animate-fade-in-up" style="animation-delay: 0.2s">
          La Tavola
        </h1>
        <p class="text-lg md:text-xl text-white/90 font-light mb-10 max-w-lg mx-auto leading-relaxed animate-fade-in-up" style="animation-delay: 0.4s">
          L'excellence de la cuisine italienne au cœur de la ville. Une expérience culinaire inoubliable.
        </p>
        <div class="animate-fade-in-up" style="animation-delay: 0.6s">
          <app-button variant="white" link="/reservation" label="Réserver une Table"></app-button>
        </div>
      </div>

      <!-- Discover Button pinned to bottom -->
      <div (click)="scrollToHistory()" class="relative z-20 pb-10 flex flex-col items-center gap-2 animate-bounce opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
        <span class="text-white text-[10px] tracking-[0.3em] uppercase font-sans">Découvrir</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>

    <!-- Story Section -->
    <section id="history" class="py-24 px-6 md:px-12 bg-bg-cream">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div appAppear class="order-2 md:order-1 relative">
           <img src="https://images.unsplash.com/photo-1568930155292-e82d9e298a2a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Paysage de la Toscane" 
                class="w-full h-[500px] object-cover rounded-sm shadow-xl grayscale-[10%] hover:grayscale-0 transition-all duration-700">
           <div class="absolute -bottom-8 -right-8 bg-brand-olive p-8 hidden md:block text-white max-w-xs shadow-lg">
              <p class="font-serif italic text-xl">"La cuisine est l'art de transformer des produits simples en souvenirs."</p>
              <p class="mt-4 text-sm font-sans uppercase tracking-widest">— Chef Alessandro</p>
           </div>
        </div>
        
        <div appAppear class="order-1 md:order-2">
          <app-section-title title="Notre Histoire" subtitle="Dal 1985"></app-section-title>
          <div class="space-y-6 text-text-grey leading-relaxed font-light text-lg">
            <p>
              Fondé par la famille Romano, <span class="font-serif italic text-text-charcoal">La Tavola</span> est né d'un désir simple : apporter l'authenticité des saveurs de la Toscane.
            </p>
            <p>
              Nous sélectionnons nos ingrédients avec une rigueur obsessionnelle. Nos tomates viennent des pentes du Vésuve, notre huile d'olive est pressée à froid dans les Pouilles, et nos pâtes sont faites main chaque matin dans nos cuisines.
            </p>
            <p>
              Dans un cadre élégant où le moderne côtoie la tradition, nous vous invitons à redécouvrir les classiques italiens, sublimés par une touche contemporaine.
            </p>
            <div class="pt-6 flex justify-center">
              <app-button variant="olive" link="/menu" label="Découvrir le Menu"></app-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Visual Divider -->
    <section class="h-[60vh] bg-fixed bg-cover bg-center relative" style="background-image: url('https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=2080&auto=format&fit=crop')">
      <div class="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
        <p appAppear class="text-4xl md:text-6xl text-white font-serif italic text-center max-w-4xl">
          "Mangia bene, ridi spesso, ama molto."
        </p>
      </div>
    </section>
  `
})
export class HomeComponent {
  scrollToHistory() {
    const element = document.getElementById('history');
    if (element) {
      // scrollIntoView avec block: 'center' centre l'élément dans la fenêtre
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}