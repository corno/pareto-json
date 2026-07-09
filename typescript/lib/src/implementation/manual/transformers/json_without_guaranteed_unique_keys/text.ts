
import type * as interface_ from "../../../../declarations/transformers/json_without_guaranteed_unique_keys/text.js"

//dependencies
import * as t_to_prose from "./prose.js"
import * as t_prose_to_text from "pareto-fountain-pen/implementation/manual/transformers/prose/text"


export const Value: interface_.Value = ($, $p) => t_prose_to_text.Phrase(
    t_to_prose.Value($),
    $p
)