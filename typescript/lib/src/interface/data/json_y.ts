import * as p_ from 'pareto-core/dist/interface/data'

import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error = {

    'conflicting key': string
    'range': d_astn_location.Range
}