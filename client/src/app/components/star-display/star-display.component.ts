import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-display',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StarDisplayComponent,
      multi: true
    }
  ],
  templateUrl: './star-display.component.html',
  styleUrl: './star-display.component.scss'
})
export class StarDisplayComponent {
  @Input() maxRating = 5;
  rating = 0;

  onChange: any = () => {};
  cdRef = inject(ChangeDetectorRef);

  setRating(rating: number) {
    this.rating = rating;
    this.onChange(this.rating);
    this.cdRef.detectChanges(); // Manually trigger change detection
  }

  writeValue(value: number): void {
    this.rating = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  getStarArray() {
    return Array(this.maxRating).fill(0).map((x, i) => i + 1);
  }
}