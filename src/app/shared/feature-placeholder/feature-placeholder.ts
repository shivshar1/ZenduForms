import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feature-placeholder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-placeholder.html',
})
export class FeaturePlaceholder {
  private route = inject(ActivatedRoute);

  readonly featureName = computed(() => {
    const name = this.route.snapshot.data['featureName'] as string | undefined;
    return name ?? 'This';
  });
}

