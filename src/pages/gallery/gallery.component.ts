import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../components/ui/section-title.component';
import { AppearDirective } from '../../directives/appear.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, AppearDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pt-32 pb-20 bg-bg-white min-h-screen">
      <div class="max-w-7xl mx-auto px-6">
        <app-section-title title="Galerie" subtitle="Atmosphère & Saveurs"></app-section-title>

        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-4" appAppear>
          @for (img of images; track img.id) {
            <div 
              (click)="openLightbox(img)"
              [class]="'relative overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300 ' + img.className">
              
              <img [src]="img.url" [alt]="img.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              <!-- Text Content -->
              <div class="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <span class="block text-brand-gold text-[10px] uppercase tracking-widest font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Découvrir</span>
                <span class="text-white font-serif text-2xl italic tracking-wide">{{ img.title }}</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Lightbox -->
      @if (selectedImage()) {
        <div class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" (click)="closeLightbox()">
          <!-- Close Button -->
          <button class="absolute top-6 right-6 text-white text-4xl font-light hover:text-brand-gold transition-colors z-50 focus:outline-none" (click)="closeLightbox(); $event.stopPropagation()">&times;</button>
          
          <!-- Prev Button -->
          <button class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2 focus:outline-none" (click)="prevImage($event)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:w-16 md:h-16">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <!-- Next Button -->
          <button class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2 focus:outline-none" (click)="nextImage($event)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:w-16 md:h-16">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <!-- Content -->
          <div class="max-w-6xl w-full max-h-[90vh] relative flex flex-col items-center" (click)="$event.stopPropagation()">
            <img [src]="selectedImage()?.url" [alt]="selectedImage()?.title" class="w-auto h-full object-contain max-h-[80vh] shadow-2xl">
            <div class="mt-6 text-center">
              <h3 class="text-white font-serif italic text-3xl">{{ selectedImage()?.title }}</h3>
              <p class="text-gray-400 text-sm uppercase tracking-widest mt-2">La Tavola Collection</p>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class GalleryComponent {
  selectedImage = signal<any>(null);

  // Configuration Bento Grid : 4 colonnes sur Desktop
  images = [
    { 
      id: 1, 
      url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1920', 
      title: 'La Salle Principale', 
      className: 'md:col-span-2 md:row-span-2' // Grand carré (2x2)
    },
    { 
      id: 2, 
      url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1920', 
      title: 'Cocktails', 
      className: 'md:col-span-1 md:row-span-1' // Petit carré (1x1)
    },
    { 
      id: 3, 
      url: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      title: 'Sélection de vin', 
      className: 'md:col-span-1 md:row-span-2' // Vertical (1x2)
    },
    { 
      id: 4, 
      url: 'https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=1920', 
      title: 'Pasta Fresca', 
      className: 'md:col-span-1 md:row-span-1' // Petit carré (1x1) - Remplit sous Pasta
    },
    { 
      id: 5, 
      url: 'https://images.unsplash.com/photo-1574647267419-cd3adf200aed?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      title: 'Pizza au feu de bois', 
      className: 'md:col-span-2 md:row-span-1' // Horizontal large (2x1)
    },
    { 
      id: 6, 
      url: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1920', 
      title: 'Notre Équipe', 
      className: 'md:col-span-2 md:row-span-1' // Horizontal large (2x1)
    },
  ];

  openLightbox(img: any) {
    this.selectedImage.set(img);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedImage.set(null);
    document.body.style.overflow = 'auto';
  }

  nextImage(event: Event) {
    event.stopPropagation();
    const current = this.selectedImage();
    const idx = this.images.findIndex(img => img.id === current.id);
    const nextIdx = (idx + 1) % this.images.length;
    this.selectedImage.set(this.images[nextIdx]);
  }

  prevImage(event: Event) {
    event.stopPropagation();
    const current = this.selectedImage();
    const idx = this.images.findIndex(img => img.id === current.id);
    const prevIdx = (idx - 1 + this.images.length) % this.images.length;
    this.selectedImage.set(this.images[prevIdx]);
  }
}