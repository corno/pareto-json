import * as p_ from 'pareto-core/interface/schema'

import type * as s_astn_location from "./location.js"

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
    'range': s_astn_location.Range
}


export type Unexpected_Properties = {
    'expected properties': p_.Dictionary<null>
    'unexpected properties': p_.Dictionary<s_astn_location.Range>
}
