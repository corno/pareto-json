import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/json_without_guaranteed_unique_keys.js"
import type * as s_out from "../../../interface/schemas/text.js"
import type * as s_parameter from "../../../interface/schemas/prose_serialize.js"

namespace declarations {
    export type Value = p_.Transformer_With_Parameter<
        s_in.Value,
        s_out.Text,
        s_parameter.Parameters
    >
}

//dependencies
import * as t_to_prose from "./prose.js"
import * as t_prose_to_text from "pareto-fountain-pen/implementation/transformers/prose/text"


export const Value: declarations.Value = ($, $p) => t_prose_to_text.Phrase(
    t_to_prose.Value($),
    $p
)