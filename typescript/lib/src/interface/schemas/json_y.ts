
import type * as s_astn_location from "./location.js"

export type Error = {
    'conflicting key': string
    'range': s_astn_location.Range
}