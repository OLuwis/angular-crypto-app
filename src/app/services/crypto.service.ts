import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { addDays, compareAsc } from "date-fns";
import { Injectable } from "@angular/core";
import { Icon } from "../types/icon";
import { Asset } from "../types/asset";
import { Cache } from "../types/cache";

@Injectable({
  providedIn: "root"
})
export class CryptoService {
  private icons = new BehaviorSubject<Icon[]>([])
  private paginated_icons = new BehaviorSubject<Icon[][]>([])
  private assets = new BehaviorSubject<Asset[]>([])

  constructor(private http: HttpClient) { }

  getIconsObservable(): Observable<Icon[]> {
    return this.icons.asObservable()
  }

  getAssetsObservable(): Observable<Asset[]> {
    return this.assets.asObservable()
  }

  getPaginatedIconsObservable(): Observable<Icon[][]> {
    return this.paginated_icons.asObservable()
  }

  getIcons(): Icon[] {
    return this.icons.getValue()
  }

  getIconByID(asset_id: string): Icon | null {
    const icon = this.icons.getValue().find(icon => icon.asset_id.toUpperCase() === asset_id)
    if (icon) return icon
    return null
  }

  getAssets(): Asset[] {
    return this.assets.getValue()
  }

  getAssetByID(asset_id: string): Asset | null {
    const asset = this.assets.getValue().find(asset => asset.asset_id.toUpperCase() === asset_id)
    if (asset) return asset
    return null
  }

  getPaginatedIcons(): Icon[][] {
    return this.paginated_icons.getValue()
  }

  getCache(type: "icons" | "assets"): Cache | null {
    const cache = localStorage.getItem(type)
    if (cache) return JSON.parse(cache)
    return null
  }

  setIcons(iconSize: number) {
    const cache = this.getCache("icons")

    if (!cache || compareAsc(new Date(), cache.duration) === 1) {
      this.http
        .get<Icon[]>(`https://rest.coinapi.io/v1/assets/icons/${iconSize.toString()}`)
        .subscribe(icons => {
          this.setCache("icons", icons)
          this.icons.next(icons)
        })
    }

    if (cache && compareAsc(new Date(), cache.duration) !== 1) {
      this.icons.next(cache.value as Icon[])
    }
  }

  setAssets() {
    const cache = this.getCache("assets")

    if (!cache || compareAsc(new Date(), cache.duration) === 1) {
      this.http
        .get<Asset[]>("https://rest.coinapi.io/v1/assets")
        .subscribe(assets => {
          const newAssets: Asset[] = []
          assets.map(a => newAssets.push({ asset_id: a.asset_id, name: a.name }))
          this.setCache("assets", newAssets)
          this.assets.next(newAssets)
        })
    }

    if (cache && compareAsc(new Date(), cache.duration) !== 1) {
      this.assets.next(cache.value as Asset[])
    }
  }

  setPaginatedIcons(pageSize: number) {
    this.icons
      .subscribe(icons => {
        if (pageSize > 0) {
          const pages = []

          for (let i = 0; i < icons.length; i += pageSize) {
            const page = icons.slice(i, i + pageSize)
            pages.push(page)
          }

          this.paginated_icons.next(pages)
        }
      })
  }

  setCache(type: "icons" | "assets", value: Icon[] | Asset[]): void {
    const cache = localStorage.getItem(type)

    if (!cache) {
      localStorage.setItem(type, JSON.stringify(""))
      return this.setCache(type, value)
    }

    const newCache: Cache = {
      type: type,
      duration: addDays(new Date(), 7),
      value: value
    }

    localStorage.setItem(type, JSON.stringify(newCache))
  }
}