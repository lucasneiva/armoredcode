import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StarRatingComponent,
      multi: true
    }
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input() maxRating = 5;
  rating = 0;
  hovered = 0;

  onChange: any = () => {};
  onTouched: any = () => {};
  cdRef = inject(ChangeDetectorRef);

  setRating(rating: number) {
    this.rating = rating;
    this.onChange(this.rating);
    this.onTouched();
    this.cdRef.detectChanges(); // Manually trigger change detection
  }

  onRatingHover(rating: number) {
    this.hovered = rating;
  }

  onRatingLeave() {
    this.hovered = 0;
  }

  writeValue(value: number): void {
    this.rating = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getStarArray() {
    return Array(this.maxRating).fill(0).map((x, i) => i + 1);
  }
}