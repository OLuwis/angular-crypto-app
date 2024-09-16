import { Component, Input, afterRender } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from '../../types/icon';
import { CommonService } from '../../services/common.service';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LowerCasePipe, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() icon!: Icon
  isSaved: boolean = false

  constructor(public commonService: CommonService) {
    this.commonService.getSaved().subscribe(saved => {
      if (this.icon && saved.find(value => value === this.icon.asset_id)) {
        return this.isSaved = true
      }
      return this.isSaved = false
    })

    afterRender(() => commonService.loadLocalStorage())
  }

  handleSave() {
    this.commonService.setSaved(this.icon.asset_id)
  }

  handleUnsave() {
    this.commonService.unsetSaved(this.icon.asset_id)
  }
}