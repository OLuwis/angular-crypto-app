import { Injectable } from "@angular/core";
import { Icon } from "../types/icon";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class FilterService {
  filtered_icons = new BehaviorSubject<Icon[]>([])
  paginated_filtered_icons = new BehaviorSubject<Icon[][]>([])

  getFilteredIcons(): Observable<Icon[]> {
    return this.filtered_icons.asObservable()
  }

  getPaginatedFilteredIcons(): Observable<Icon[][]> {
    return this.paginated_filtered_icons.asObservable()
  }

  getFilteredIconsValue(): Icon[] {
    return this.filtered_icons.getValue()
  }

  getPaginatedFilteredIconsValue(): Icon[][] {
    return this.paginated_filtered_icons.getValue()
  }

  setFilteredIcons(icons: Icon[], value: string) {
    const result: Icon[] = []
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].asset_id.includes(value)) result.push(icons[i])
    }

    for (let i = 0; i < value.length; i++) {
      for (let x = 0; x < value.length; x++) {
        if (x === i) continue
        for (let y = 0; y < icons.length; y++) {
          if (icons[y].asset_id.includes(value[i] + value[x])) result.push(icons[y])
        }
      }
    }

    this.filtered_icons.next([...new Set(result)])
  }

  setPaginatedFilteredIcons(pageSize: number) {
    this.filtered_icons.subscribe(icons => {
      const arr = []
      for (let i = 0; i < icons.length; i += pageSize) {
        const page = icons.slice(i, i + pageSize)
        arr.push(page)
      }
      this.paginated_filtered_icons.next(arr)
    })
  }
}