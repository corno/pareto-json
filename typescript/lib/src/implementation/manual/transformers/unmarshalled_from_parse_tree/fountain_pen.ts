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
import * as t_json_from_parse_tree_to_fountain_pen from "../json_from_parse_tree/fountain_pen"
import * as t_unmarshalled_from_json_to_fountain_pen from "../unmarshalled_from_json/fountain_pen"




export const Error: interface_.Error = ($) => p_.decide.state($, ($) => {
    switch ($[0]) {
        case 'json': return p_.ss($, ($) => t_json_from_parse_tree_to_fountain_pen.Error($))
        case 'unmarshall':return p_.ss($, ($) => t_unmarshalled_from_json_to_fountain_pen.Error($))
        
        default: return p_.au($[0])
    }
})