import * as p_ from 'pareto-core/interface/data'

import type * as s_json_with_parse_info from "./json_with_parse_info.js"
import type * as s_location from "./location.js"

export type Object = s_json_with_parse_info.Object

export type Object_With_Unique_Keys = {
    'range': s_location.Range
    'properties': p_.Dictionary<s_json_with_parse_info.Key_Value_Pair>
}

export type Object_No_Unexpected_Properties = Object_With_Unique_Keys

export type Property = s_json_with_parse_info.Key_Value_Pair

export type Array = s_json_with_parse_info.Array

export type Boolean = s_json_with_parse_info.Boolean

export type Null = s_json_with_parse_info.Null

export type Number = s_json_with_parse_info.Number

export type String = s_json_with_parse_info.String

export type Nullable_Value = p_.Optional_Value<s_json_with_parse_info.Value>