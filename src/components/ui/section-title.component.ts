import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-center mb-12">
      <span class="block text-brand-terracotta text-sm font-bold tracking-[0.2em] uppercase mb-3 font-sans">
        {{ subtitle() }}
      </span>
      <h2 class="text-4xl md:text-5xl font-serif text-text-charcoal">
        {{ title() }}
      </h2>
      <div class="w-16 h-0.5 bg-brand-gold mx-auto mt-6"></div>
    </div>
  `
})
export class SectionTitleComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
}