import * as i_unmarshalling from "pareto-json/modules/unmarshalling/schemas/json_value_unmarshalling"
import * as i_deserialization from "pareto-json/modules/deserialization/schemas/deserialization"

export type Error =
| ['deserialization', i_deserialization.Error]
| ['unmarshalling', i_unmarshalling.Error]

export type Parameters = i_deserialization.Parameters