import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent } from '../../components/card/card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonService } from '../../services/common.service';
import { CryptoService } from '../../services/crypto.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { AsyncPipe } from '@angular/common';
import { PaginatorIntl } from '../../utils/paginator.intl';
import { Icon } from '../../types/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, AsyncPipe, ReactiveFormsModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }]
})
export class HomeComponent {
  page_index: number = 0
  saved_icons: Icon[] = []
  filter = new FormControl("")

  constructor(public commonService: CommonService, public cryptoService: CryptoService, public filterService: FilterService) {
    cryptoService.setIcons(64)
    cryptoService.setPaginatedIcons(commonService.getPageSizeValue())
    filterService.setPaginatedFilteredIcons(commonService.getPageSizeValue())

    this.filter.valueChanges.subscribe(value => {
      if (value) {
        this.filterService.setFilteredIcons(cryptoService.getIconsValue(), value.toUpperCase())
      }
    })

    this.commonService.getSaved().subscribe(saved => {
      this.saved_icons = this.cryptoService.getIconsValue().filter(icon => saved.includes(icon.asset_id))
    })
  }

  handlePageEvent(e: PageEvent) {
    this.page_index = e.pageIndex
    this.commonService.setPageSize(e.pageSize)
    this.cryptoService.setPaginatedIcons(e.pageSize)
  }

  handleFilterPageEvent(e: PageEvent) {
    this.page_index = e.pageIndex
    this.commonService.setPageSize(e.pageSize)
    this.filterService.setPaginatedFilteredIcons(e.pageSize)
  }
}