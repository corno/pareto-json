import * as _pi from 'pareto-core/dist/interface'

import * as d_json_with_parse_info from "./json_with_parse_info"
import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Object = d_json_with_parse_info.Object

export type Object_With_Unique_Keys = {
    'range': d_location.Range
    'properties': _pi.Dictionary<d_json_with_parse_info.Key_Value_Pair>
}

export type Object_No_Unexpected_Properties = Object_With_Unique_Keys

export type Property = d_json_with_parse_info.Key_Value_Pair

export type Array = d_json_with_parse_info.Array

export type Boolean = d_json_with_parse_info.Boolean

export type Null = d_json_with_parse_info.Null

export type Number = d_json_with_parse_info.Number

export type String = d_json_with_parse_info.String