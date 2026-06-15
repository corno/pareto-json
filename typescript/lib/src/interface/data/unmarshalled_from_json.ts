import * as p_di from 'pareto-core/dist/interface/data'

import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error = {
    'type':
    | ['unexpected properties', Unexpected_Properties]
    | ['multiple properties with this key', string]
    | ['missing property', string]
    | ['unexpected type', {
        'expected': p_di.List<string>
    }]
    | ['unexpected enum value', {
        'expected': p_di.List<string>
    }]
    'range': d_astn_location.Range
}


export type Unexpected_Properties = {
    'expected properties': p_di.Dictionary<null>
    'unexpected properties': p_di.Dictionary<d_astn_location.Range>
}