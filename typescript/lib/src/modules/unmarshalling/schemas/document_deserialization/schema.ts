import * as i_unmarshalling from "../json_value_unmarshalling/schema.js"
import * as i_deserialization from "../../../deserialization/schemas/deserialization/schema.js"

export type Error =
| ['deserialization', i_deserialization.Error]
| ['unmarshalling', i_unmarshalling.Error]

export type Parameters = i_deserialization.Parameters