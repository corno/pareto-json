import * as pt from 'pareto-core/dist/transformer/implementation'

//data types
import * as d_in from "../../../../interface/to_be_generated/json_from_list_of_characters"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

//dependencies
import * as t_from_parse_tree from "../json_from_parse_tree/fountain_pen"
import * as t_deserialize_parse_tree from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/fountain_pen"


export const Error = ($: d_in.Error): d_out.Phrase => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'deserialize astn parse tree': return pt.ss($, ($) => t_deserialize_parse_tree.Error($))
        case 'jsonify':return pt.ss($, ($) => t_from_parse_tree.Error($))
        default: return pt.au($[0])
    }
})