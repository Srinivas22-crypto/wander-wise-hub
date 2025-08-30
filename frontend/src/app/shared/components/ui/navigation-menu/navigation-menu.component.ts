import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavigationItem {
  label: string;
  href?: string;
  children?: NavigationItem[];
  icon?: string;
  description?: string;
}

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  @Input() items: NavigationItem[] = [];
  @Input() className: string = '';
  @Output() itemClick = new EventEmitter<NavigationItem>();

  activeDropdown: string | null = null;
  private dropdownTimeout: any;

  showDropdown(label: string): void {
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
    this.activeDropdown = label;
  }

  hideDropdown(label: string): void {
    this.dropdownTimeout = setTimeout(() => {
      if (this.activeDropdown === label) {
        this.activeDropdown = null;
      }
    }, 150);
  }

  onItemClick(item: NavigationItem): void {
    this.itemClick.emit(item);
    this.activeDropdown = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.navigation-menu')) {
      this.activeDropdown = null;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.activeDropdown = null;
  }
}
