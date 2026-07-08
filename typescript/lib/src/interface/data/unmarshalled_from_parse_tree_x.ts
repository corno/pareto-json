import * as p_ from 'pareto-core/interface/data'
import type * as d_astn_unmarshall from "astn-core/interface/data/unmarshall"
import type * as d_astn_location from "astn-core/interface/generated/liana/schemas/location/data"


export type Error =
    | ['astn', d_astn_unmarshall.Error]
    | ['json', JSON_Unmarshall_Error]


export type JSON_Unmarshall_Error = {
    'type':
    | ['unexpected properties', p_.Dictionary<d_astn_location.Range>]
    | ['missing property', string]
    | ['not a boolean', null]
    | ['not a null', null]
    | ['not a number', null]
    | ['not a string', null]
    'range': d_astn_location.Range
}