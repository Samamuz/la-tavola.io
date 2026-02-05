import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (link()) {
      <a [routerLink]="link()" [class]="buttonClasses()">
        @if (label()) {
          {{ label() }}
        } @else {
          <ng-content></ng-content>
        }
      </a>
    } @else {
      <button [type]="type()" [class]="buttonClasses()" [disabled]="disabled()">
        @if (label()) {
          {{ label() }}
        } @else {
          <ng-content></ng-content>
        }
      </button>
    }
  `
})
export class ButtonComponent {
  variant = input<'primary' | 'outline' | 'white' | 'olive'>('primary');
  link = input<string | null>(null);
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  label = input<string>('');

  buttonClasses = computed(() => {
    const base = 'inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 ease-out border font-sans tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';
    const variants = {
      primary: 'bg-brand-terracotta text-white border-brand-terracotta hover:bg-white hover:text-brand-terracotta',
      outline: 'bg-transparent text-text-charcoal border-text-charcoal hover:bg-text-charcoal hover:text-white',
      white: 'bg-transparent text-white border-white hover:bg-white hover:text-text-charcoal',
      olive: 'bg-brand-olive text-white border-brand-olive hover:bg-white hover:text-brand-olive'
    };
    return `${base} ${variants[this.variant()]}`;
  });
}