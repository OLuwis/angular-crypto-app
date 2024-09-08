import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  itemsPerPageLabel: string = "Items Per Page";
  nextPageLabel: string = "Next Page";
  previousPageLabel: string = "Previous Page";
  firstPageLabel: string = "";
  lastPageLabel: string = "";
  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return "Page 1 of 1"
    }
    const amountPages = Math.ceil(length / pageSize)
    return `Page ${page + 1} of ${amountPages}`
  };
}