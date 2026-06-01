import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshalled_from_parse_tree"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

//dependencies
import * as t_json_from_parse_tree_to_fountain_pen from "../json_from_parse_tree/fountain_pen"
import * as t_unmarshalled_from_json_to_fountain_pen from "../unmarshalled_from_json/fountain_pen"


export const Value = ($: d_in.Error): d_out.Phrase => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'json': return _p.ss($, ($) => t_json_from_parse_tree_to_fountain_pen.Error($))
        case 'unmarshall':return _p.ss($, ($) => t_unmarshalled_from_json_to_fountain_pen.Error($))
        
        default: return _p.au($[0])
    }
})