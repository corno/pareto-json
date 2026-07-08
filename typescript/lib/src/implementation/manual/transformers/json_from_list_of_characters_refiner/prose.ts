import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/json_from_list_of_characters_refiner.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_json_from_parse_tree_refiner_to_prose from "../json_from_parse_tree_refiner/prose.js"
import * as t_deserialize_parse_tree_to_prose from "astn-core/implementation/manual/transformers/deserialize_parse_tree/prose"

export namespace interface_ {

    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >

}

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize astn parse tree': return p_.option($, ($) => t_deserialize_parse_tree_to_prose.Error($))
            case 'jsonify': return p_.option($, ($) => t_json_from_parse_tree_refiner_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })