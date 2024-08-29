import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  itemsPerPageLabel: string = "Items por página";
  nextPageLabel: string = "Próxima página";
  previousPageLabel: string = "Página Anterior";
  firstPageLabel: string = "Primeira Página";
  lastPageLabel: string = "Ultimá Página";
  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return "Página 1 de 1"
    }
    const amountPages = Math.ceil(length / pageSize)
    return `Página ${page + 1} of ${amountPages}`
  };
}