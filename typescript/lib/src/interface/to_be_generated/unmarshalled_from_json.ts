import * as pi from 'pareto-core/dist/interface'

import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error = {
    'type':
    | ['unexpected properties', Unexpected_Properties]
    | ['multiple properties with this key', string]
    | ['missing property', string]
    | ['unexpected type', {
        'expected': pi.List<string>
    }]
    | ['unexpected enum value', {
        'expected': pi.List<string>
    }]
    'range': d_astn_location.Range
}


export type Unexpected_Properties = {
    'expected properties': pi.Dictionary<null>
    'unexpected properties': pi.Dictionary<d_astn_location.Range>
}