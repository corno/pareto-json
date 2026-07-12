import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/json_from_list_of_characters_refiner.js"
import type * as s_out from "../../../interface/schemas/prose.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}

//dependencies
import * as t_json_from_parse_tree_refiner_to_prose from "../json_from_parse_tree_refiner/prose.js"
import * as t_deserialize_parse_tree_to_prose from "astn-core/implementation/transformers/deserialize_parse_tree/prose"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize astn parse tree': return p_.option($, ($) => t_deserialize_parse_tree_to_prose.Error($))
            case 'jsonify': return p_.option($, ($) => t_json_from_parse_tree_refiner_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })