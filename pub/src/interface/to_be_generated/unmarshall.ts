import * as _pi from 'pareto-core/dist/interface'
import * as d_astn_unmarshall from "astn-core/dist/interface/to_be_generated/unmarshall"
import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"


export type Error =
    | ['astn', d_astn_unmarshall.Error]
    | ['json', JSON_Unmarshall_Error]


export type JSON_Unmarshall_Error = {
    'type':
    | ['unexpected properties', _pi.Dictionary<d_astn_location.Range>]
    | ['missing property', string]
    | ['not a string', null]
    | ['not a boolean', null]
    | ['not a null', null]
    | ['not a number', null]
    'range': d_astn_location.Range
}