import type * as s_astn_deserialize from "./astn_parse_tree_deserialization.js"
import type * as s_location from "./location.js"

export type Parameters = s_astn_deserialize.Parameters

export type Error = 
| ['deserialize astn parse tree', s_astn_deserialize.Error]
| ['jsonify', JSONify_Error]

export type JSONify_Error = {
    'range': s_location.Range
    'type': JSONify_Error_Type
}

export type JSONify_Error_Type =
    | ['missing property', null]
    | ['apostrophed text', null]
    | ['backticked text', null]
    | ['undelimited text', null]
    | ['group', null]
    | ['include', null]
    | ['missing data', null]
    | ['nothing', null]
    | ['optional', null]
    | ['state', null]