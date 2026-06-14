import * as p_di from 'pareto-core/dist/data/interface'
import * as d_astn_unmarshall from "astn-core/dist/interface/to_be_generated/unmarshall"
import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"


export type Error =
    | ['astn', d_astn_unmarshall.Error]
    | ['json', JSON_Unmarshall_Error]


export type JSON_Unmarshall_Error = {
    'type':
    | ['unexpected properties', p_di.Dictionary<d_astn_location.Range>]
    | ['missing property', string]
    | ['not a boolean', null]
    | ['not a null', null]
    | ['not a number', null]
    | ['not a string', null]
    'range': d_astn_location.Range
}