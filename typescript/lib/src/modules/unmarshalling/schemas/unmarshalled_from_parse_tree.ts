import * as p_ from 'pareto-core/interface/schema'
import type * as s_astn_unmarshall from "./astn_value_unmarshalling.js"
import type * as s_astn_location from "./location.js"


export type Error =
    | ['astn', s_astn_unmarshall.Error]
    | ['json', JSON_Unmarshall_Error]


export type JSON_Unmarshall_Error = {
    'type':
    | ['unexpected properties', p_.Dictionary<s_astn_location.Range>]
    | ['missing property', string]
    | ['not a boolean', null]
    | ['not a null', null]
    | ['not a number', null]
    | ['not a string', null]
    'range': s_astn_location.Range
}