import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../../interface/declarations/transformers/unmarshalled_from_parse_tree/prose.js"

//dependencies
import * as t_json_from_parse_tree_to_prose from "../json_from_parse_tree_refiner/prose.js"
import * as t_unmarshalled_from_json_to_prose from "../unmarshalled_from_json/prose.js"




export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'json': return p_.option($, ($) => t_json_from_parse_tree_to_prose.Error($))
            case 'unmarshall': return p_.option($, ($) => t_unmarshalled_from_json_to_prose.Error($))

            default: return p_.exhaustive($[0])
        }
    })