import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Icon } from "../types/icon";
import { BehaviorSubject, Observable } from "rxjs";
import icons from "../utils/data.json"

@Injectable({
  providedIn: "root"
})
export class CryptoService {
  private icons = new BehaviorSubject<Icon[]>([])
  private paginated_icons = new BehaviorSubject<Icon[][]>([])

  constructor(private http: HttpClient) { }

  getIcons(): Observable<Icon[]> {
    return this.icons.asObservable()
  }

  getPaginatedIcons(): Observable<Icon[][]> {
    return this.paginated_icons.asObservable()
  }

  getIconsValue(): Icon[] {
    return this.icons.getValue()
  }

  getPaginatedIconsValue(): Icon[][] {
    return this.paginated_icons.getValue()
  }

  setIcons(iconSize: number) {
    this.http
      .get<Icon[]>(`https://rest.coinapi.io/v1/assets/icons/${iconSize.toString()}`)
      .subscribe(icons => this.icons.next(icons))
  }

  setPaginatedIcons(pageSize: number) {
    this.icons
      .subscribe(icons => {
        const _arr = []
        for (let i = 0; i < icons.length; i += pageSize) {
          const page = icons.slice(i, i + pageSize)
          _arr.push(page)
        }
        this.paginated_icons.next(_arr)
      })
  }
}