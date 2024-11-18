import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProfileService, UserRatingResponse } from '../../services/profile.service';

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
export class StarDisplayComponent implements OnChanges {
  @Input() maxRating = 5;
  @Input() userId!: string;  // Add Input for userId
  rating = 0;
  averageRating: number = 0; // Store the calculated average

  profileService = inject(ProfileService);
  onChange: any = () => { };
  cdRef = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void { // Use ngOnChanges to react to userId changes
    if (changes['userId'] && this.userId) {
      this.fetchUserRatings();
    }
  }

  fetchUserRatings() {
    this.profileService.getUserRatings(this.userId).subscribe({
      next: (res: UserRatingResponse) => {
        if (res.success && res.data.received.length > 0) { // Check if ratings exist
          const ratings = res.data.received;

          const totalRating = ratings.reduce((sum, rating) => {
            return sum + rating.workQuality + rating.communication + rating.professionalism; // Include other ratings criteria if necessary
          }, 0);

          this.averageRating = totalRating / (ratings.length * 3); // Calculate average. Divided by 3 because we sum 3 criteria
          this.rating = Math.round(this.averageRating); // Round for whole stars
          this.cdRef.detectChanges();
        } else {
          // Handle case where no ratings are found
          console.log('No ratings found for this user.');
          this.rating = 0; // Reset if there are no ratings
          this.cdRef.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error fetching ratings:', error);
        // Handle error, e.g., display an error message
      }
    });
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

  getStarStyle(index: number) {
    if (index <= this.rating) {
      return 'fa fa-star star-yellow'; // Gold star when it's included in the rating
    } else if (index - this.rating < 1) {
      return 'fa fa-star-half-o star-yellow';
    } else {
      return 'fa fa-star-o'; // Empty star for the rest
    }
  }

  setRating(rating: number) {
    this.rating = rating;
    this.onChange(this.rating);
    this.cdRef.detectChanges(); // Manually trigger change detection
  }

}