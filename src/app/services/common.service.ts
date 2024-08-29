import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CommonService {
  private columns = new BehaviorSubject<number>(0)
  private page_size = new BehaviorSubject<number>(25)
  private saved = new BehaviorSubject<string[]>([])

  getColumns(): Observable<number> {
    return this.columns.asObservable()
  }

  getPageSize(): Observable<number> {
    return this.page_size.asObservable()
  }

  getSaved(): Observable<string[]> {
    return this.saved.asObservable()
  }

  getColumnsValue(): number {
    return this.columns.getValue()
  }

  getPageSizeValue(): number {
    return this.page_size.getValue()
  }

  getSavedValue(): string[] {
    return this.saved.getValue()
  }

  setColumns(column: number) {
    this.columns.next(column)
  }

  setPageSize(size: number) {
    this.page_size.next(size)
  }

  setSaved(asset_id: string) {
    if (!localStorage.getItem("saved")) {
      localStorage.setItem("saved", JSON.stringify([asset_id]))
      this.saved.next([asset_id])
      return;
    }

    const saved = JSON.parse(localStorage.getItem("saved")!)
    localStorage.setItem("saved", JSON.stringify([...saved, asset_id]))
    this.saved.next([...saved, asset_id])
  }

  unsetSaved(asset_id: string) {
    const saved = JSON.parse(localStorage.getItem("saved")!) as string[]
    localStorage.setItem("saved", JSON.stringify(saved.filter(item => item !== asset_id)))
    this.saved.next(saved.filter(item => item !== asset_id))
  }

  loadLocalStorage() {
    if (localStorage.getItem("saved")) this.saved.next(JSON.parse(localStorage.getItem("saved")!) as string[])
  }
}