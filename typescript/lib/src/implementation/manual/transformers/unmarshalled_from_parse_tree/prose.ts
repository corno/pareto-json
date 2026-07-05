import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshalled_from_parse_tree"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export namespace interface_ {

    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >

}

//dependencies
import * as t_json_from_parse_tree_to_prose from "../json_from_parse_tree_refiner/prose"
import * as t_unmarshalled_from_json_to_prose from "../unmarshalled_from_json/prose"




export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'json': return p_.option($, ($) => t_json_from_parse_tree_to_prose.Error($))
            case 'unmarshall': return p_.option($, ($) => t_unmarshalled_from_json_to_prose.Error($))

            default: return p_.au($[0])
        }
    })