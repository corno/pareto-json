
import type * as s_astn_location from "astn-core/interface/data/location"

export type Error = {
    'conflicting key': string
    'range': s_astn_location.Range
}