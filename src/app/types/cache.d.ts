import { Asset } from "./asset";
import { Icon } from "./icon";

export interface Cache {
  type: "icons" | "assets",
  duration: Date,
  value: Icon[] | Asset[]
}