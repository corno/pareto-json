import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshalled_from_parse_tree.js"
import type * as s_out from "../../../interface/schemas/prose.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}

//dependencies
import * as t_json_from_parse_tree_to_prose from "../json_from_parse_tree_refiner/prose.js"
import * as t_unmarshalled_from_json_to_prose from "../unmarshalled_from_json/prose.js"




export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'json': return p_.option($, ($) => t_json_from_parse_tree_to_prose.Error($))
            case 'unmarshall': return p_.option($, ($) => t_unmarshalled_from_json_to_prose.Error($))

            default: return p_.exhaustive($[0])
        }
    })