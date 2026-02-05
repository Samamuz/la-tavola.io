import { Component, signal, inject, computed, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()'
  },
  template: `
    <!-- Splash Screen -->
    <div class="fixed inset-0 z-[100] bg-bg-cream flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out"
         [class.opacity-0]="!showSplash()"
         [class.pointer-events-none]="!showSplash()"
         [class.opacity-100]="showSplash()">
      
      <div class="text-center transform transition-transform duration-1000"
           [class.scale-95]="!showSplash()"
           [class.scale-100]="showSplash()">
        
        <h1 class="text-6xl md:text-8xl font-serif italic font-bold text-text-charcoal mb-6 tracking-tighter opacity-0 animate-fade-in-up" 
            style="animation-delay: 0.2s">
          La Tavola
        </h1>
        
        <div class="h-0.5 w-0 bg-brand-terracotta mx-auto mb-6 transition-all duration-1000 delay-500 ease-out"
             [class.w-24]="showSplash()"></div>
        
        <p class="text-sm md:text-base font-sans uppercase tracking-[0.4em] text-brand-olive opacity-0 animate-fade-in-up" 
           style="animation-delay: 0.6s">
          L'Art de Vivre
        </p>
      </div>
    </div>

    <div class="flex flex-col min-h-screen">
      <!-- Navigation -->
      <nav class="fixed top-0 w-full z-50 transition-all duration-300"
           [class.bg-white]="shouldShowSolidHeader()"
           [class.shadow-md]="isScrolled()"
           [class.py-4]="!isScrolled()"
           [class.py-2]="isScrolled()">
        
        <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <!-- Logo -->
          <a routerLink="/" class="text-2xl font-serif font-bold italic tracking-tighter z-50 relative transition-colors duration-300"
             [class.text-white]="!shouldShowSolidHeader() && !isMobileMenuOpen()" 
             [class.text-text-charcoal]="shouldShowSolidHeader() || isMobileMenuOpen()">
            La Tavola
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-10">
            @for (item of navItems; track item.path) {
              <a [routerLink]="item.path" 
                 routerLinkActive="after:w-full"
                 [routerLinkActiveOptions]="{exact: item.exact}"
                 class="text-sm uppercase tracking-widest font-medium relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-terracotta after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300"
                 [class.text-white]="!shouldShowSolidHeader()"
                 [class.text-text-charcoal]="shouldShowSolidHeader()">
                {{ item.label }}
              </a>
            }
            <a routerLink="/reservation" 
               class="px-5 py-2 border text-sm uppercase tracking-widest font-medium transition-all duration-300"
               [class.border-white]="!shouldShowSolidHeader()"
               [class.text-white]="!shouldShowSolidHeader()"
               [class.hover:bg-white]="!shouldShowSolidHeader()"
               [class.hover:text-text-charcoal]="!shouldShowSolidHeader()"
               [class.border-brand-terracotta]="shouldShowSolidHeader()"
               [class.text-brand-terracotta]="shouldShowSolidHeader()"
               [class.hover:bg-brand-terracotta]="shouldShowSolidHeader()"
               [class.hover:text-white]="shouldShowSolidHeader()">
               Réserver
            </a>
          </div>

          <!-- Mobile Toggle -->
          <button (click)="toggleMobileMenu()" class="md:hidden z-50 focus:outline-none group">
             <div class="space-y-1.5 w-6">
                <span class="block w-full h-0.5 transition-all duration-300"
                  [class.bg-white]="!shouldShowSolidHeader() && !isMobileMenuOpen()"
                  [class.bg-text-charcoal]="shouldShowSolidHeader() || isMobileMenuOpen()"
                  [class.rotate-45]="isMobileMenuOpen()"
                  [class.translate-y-2]="isMobileMenuOpen()"></span>
                <span class="block w-full h-0.5 transition-all duration-300"
                  [class.bg-white]="!shouldShowSolidHeader() && !isMobileMenuOpen()"
                  [class.bg-text-charcoal]="shouldShowSolidHeader() || isMobileMenuOpen()"
                  [class.opacity-0]="isMobileMenuOpen()"></span>
                <span class="block w-full h-0.5 transition-all duration-300"
                  [class.bg-white]="!shouldShowSolidHeader() && !isMobileMenuOpen()"
                  [class.bg-text-charcoal]="shouldShowSolidHeader() || isMobileMenuOpen()"
                  [class.-rotate-45]="isMobileMenuOpen()"
                  [class.-translate-y-2]="isMobileMenuOpen()"></span>
             </div>
          </button>
        </div>

        <!-- Mobile Menu Overlay -->
        <div class="fixed inset-0 bg-bg-cream z-40 transition-transform duration-500 ease-in-out flex items-center justify-center md:hidden"
             [class.translate-x-full]="!isMobileMenuOpen()"
             [class.translate-x-0]="isMobileMenuOpen()">
             
             <div class="flex flex-col items-center space-y-8">
                @for (item of navItems; track item.path) {
                  <a [routerLink]="item.path" 
                     (click)="closeMobileMenu()"
                     class="text-2xl font-serif text-text-charcoal hover:text-brand-terracotta transition-colors">
                     {{ item.label }}
                  </a>
                }
                <a routerLink="/reservation" (click)="closeMobileMenu()" class="mt-8 px-8 py-3 bg-brand-terracotta text-white font-sans uppercase tracking-widest text-sm">
                  Réserver
                </a>
             </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="flex-grow w-full">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="bg-text-charcoal text-white pt-20 pb-10 px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <!-- Brand -->
          <div class="space-y-6">
            <h2 class="text-3xl font-serif italic">La Tavola</h2>
            <p class="text-gray-400 text-sm leading-relaxed">
              Une cuisine authentique, des ingrédients d'exception et une passion pour l'hospitalité italienne.
            </p>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-sm font-bold uppercase tracking-widest mb-6 text-brand-gold">Contact</h4>
            <ul class="space-y-4 text-gray-300 text-sm">
              <li>Place Saint-François 12, 1003 Lausanne</li>
              <li>+41 21 123 45 67</li>
              <li>hello@latavola.ch</li>
            </ul>
          </div>

          <!-- Hours -->
          <div>
            <h4 class="text-sm font-bold uppercase tracking-widest mb-6 text-brand-gold">Horaires</h4>
            <ul class="space-y-4 text-gray-300 text-sm">
              <li class="flex justify-between"><span>Lun - Jeu</span> <span>19:00 - 22:30</span></li>
              <li class="flex justify-between"><span>Ven - Sam</span> <span>19:00 - 23:00</span></li>
              <li class="flex justify-between text-brand-terracotta"><span>Dimanche</span> <span>Fermé</span></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
             <h4 class="text-sm font-bold uppercase tracking-widest mb-6 text-brand-gold">Newsletter</h4>
             <div class="flex flex-col gap-3">
               <input type="email" placeholder="Votre email" class="bg-gray-800 border border-gray-700 p-3 text-sm text-white focus:border-brand-gold outline-none">
               <button class="bg-brand-olive text-white px-4 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-brand-olive transition-colors">
                 S'inscrire
               </button>
             </div>
          </div>

        </div>

        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 La Tavola. Tous droits réservés.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" class="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  `
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  showSplash = signal(true);
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isHomePage = signal(true);

  // We show the solid header if we are scrolled OR if we are NOT on the home page
  shouldShowSolidHeader = computed(() => this.isScrolled() || !this.isHomePage());

  navItems = [
    { path: '/', label: 'Accueil', exact: true },
    { path: '/menu', label: 'Menu', exact: false },
    { path: '/gallery', label: 'Galerie', exact: false },
  ];

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isHomePage.set(this.router.url === '/');
      this.isMobileMenuOpen.set(false);
    });
  }

  ngOnInit() {
    // Hide splash screen after 2.5 seconds
    setTimeout(() => {
      this.showSplash.set(false);
    }, 2500);
  }

  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = 'auto';
  }
}