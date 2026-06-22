import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/json_from_list_of_characters"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_from_parse_tree from "../json_from_parse_tree/fountain_pen"
import * as t_deserialize_parse_tree from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"

export namespace interface_ {

    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >

}

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize astn parse tree': return p_.ss($, ($) => t_deserialize_parse_tree.Error($))
            case 'jsonify': return p_.ss($, ($) => t_from_parse_tree.Error($))
            default: return p_.au($[0])
        }
    })