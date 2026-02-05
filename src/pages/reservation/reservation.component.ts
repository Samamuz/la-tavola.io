import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SectionTitleComponent } from '../../components/ui/section-title.component';
import { ButtonComponent } from '../../components/ui/button.component';
import { AppearDirective } from '../../directives/appear.directive';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionTitleComponent, ButtonComponent, AppearDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pt-32 pb-20 bg-bg-white min-h-screen relative overflow-hidden">
      <!-- Background Element -->
      <div class="absolute top-0 right-0 w-1/3 h-full bg-bg-cream opacity-50 skew-x-12 translate-x-32 -z-10"></div>

      <div class="max-w-4xl mx-auto px-6">
        <app-section-title title="Réserver" subtitle="Votre Table"></app-section-title>

        <div appAppear class="bg-white p-8 md:p-12 shadow-2xl rounded-sm border border-gray-100 relative overflow-hidden">
          @if (!submitted) {
            <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="space-y-8">
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Date -->
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-widest text-text-charcoal font-bold">Date</label>
                  <input type="date" formControlName="date" 
                    class="w-full p-4 bg-bg-cream/30 border-b-2 border-gray-200 focus:border-brand-terracotta focus:bg-white transition-colors outline-none font-serif text-lg">
                </div>

                <!-- Time -->
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-widest text-text-charcoal font-bold">Heure</label>
                  <select formControlName="time" 
                    class="w-full p-4 bg-bg-cream/30 border-b-2 border-gray-200 focus:border-brand-terracotta focus:bg-white transition-colors outline-none font-serif text-lg">
                    <option value="">Choisir...</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                  </select>
                </div>
              </div>

              <div class="space-y-2">
                  <label class="text-xs uppercase tracking-widest text-text-charcoal font-bold">Nombre de personnes</label>
                  <div class="flex gap-4">
                    @for (num of [1,2,3,4,5,6,8]; track num) {
                      <button type="button" 
                        (click)="setGuests(num)"
                        [class.bg-brand-olive]="guests() === num"
                        [class.text-white]="guests() === num"
                        class="w-10 h-10 rounded-full border border-gray-200 hover:border-brand-olive hover:text-brand-olive flex items-center justify-center transition-all">
                        {{ num }}
                      </button>
                    }
                  </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Name -->
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-widest text-text-charcoal font-bold">Nom Complet</label>
                  <input type="text" formControlName="name" placeholder="Votre nom"
                    class="w-full p-4 bg-bg-cream/30 border-b-2 border-gray-200 focus:border-brand-terracotta focus:bg-white transition-colors outline-none font-serif text-lg">
                </div>
                
                <!-- Email -->
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-widest text-text-charcoal font-bold">Email</label>
                  <input type="email" formControlName="email" placeholder="votre@email.com"
                    class="w-full p-4 bg-bg-cream/30 border-b-2 border-gray-200 focus:border-brand-terracotta focus:bg-white transition-colors outline-none font-serif text-lg">
                </div>
              </div>

               <!-- Phone -->
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-widest text-text-charcoal font-bold">Téléphone</label>
                  <input type="tel" formControlName="phone" placeholder="079..."
                    class="w-full p-4 bg-bg-cream/30 border-b-2 border-gray-200 focus:border-brand-terracotta focus:bg-white transition-colors outline-none font-serif text-lg">
                </div>

              <div class="pt-6 flex justify-center">
                 <app-button type="submit" [disabled]="bookingForm.invalid">
                   Confirmer la réservation
                 </app-button>
              </div>
            </form>
          } @else {
             <div class="text-center py-16 animate-fade-in-up">
                <div class="w-20 h-20 bg-brand-olive rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 class="text-3xl font-serif text-text-charcoal mb-4">Grazie Mille !</h3>
                <p class="text-text-grey max-w-md mx-auto">Votre demande de réservation a bien été reçue. Vous recevrez une confirmation par email très prochainement.</p>
                <div class="mt-8">
                  <app-button variant="outline" (click)="submitted = false; bookingForm.reset(); setGuests(2)">Nouvelle réservation</app-button>
                </div>
             </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ReservationComponent {
  fb = inject(FormBuilder);
  submitted = false;
  
  // Use a signal for local UI state to ensure OnPush updates correctly for this interaction
  guests = signal(2);

  bookingForm = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    guests: [2, Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required]
  });

  setGuests(num: number) {
    this.guests.set(num);
    this.bookingForm.patchValue({ guests: num });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.submitted = true;
    }
  }
}