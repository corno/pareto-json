import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/unmarshalled_from_parse_tree.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace interface_ {

    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >

}

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