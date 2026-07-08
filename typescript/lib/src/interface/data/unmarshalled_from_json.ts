import * as p_ from 'pareto-core/interface/data'

import type * as d_astn_location from "astn-core/interface/generated/liana/schemas/location/data"

export type Error = {
    'type':
    | ['unexpected properties', Unexpected_Properties]
    | ['multiple properties with this key', string]
    | ['missing property', string]
    | ['unexpected type', {
        'expected': p_.List<string>
    }]
    | ['unexpected enum value', {
        'expected': p_.List<string>
    }]
    'range': d_astn_location.Range
}


export type Unexpected_Properties = {
    'expected properties': p_.Dictionary<null>
    'unexpected properties': p_.Dictionary<d_astn_location.Range>
}