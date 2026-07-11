
import type * as d_astn_location from "astn-core/interface/data/location"

export type Error = {
    'conflicting key': string
    'range': d_astn_location.Range
}