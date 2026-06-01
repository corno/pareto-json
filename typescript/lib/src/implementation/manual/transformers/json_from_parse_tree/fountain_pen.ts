import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../interface/to_be_generated/json_from_parse_tree"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

//dependencies


export const Error = ($: d_in.Error): d_out.Phrase => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'missing property': return _p.ss($, ($) => sh.ph.literal("missing property"))
        case 'apostrophed text': return _p.ss($, ($) => sh.ph.literal("apostrophed text"))
        case 'backticked text': return _p.ss($, ($) => sh.ph.literal("backticked text"))
        case 'undelimited text': return _p.ss($, ($) => sh.ph.literal("undelimited text"))
        case 'group': return _p.ss($, ($) => sh.ph.literal("group"))
        case 'include': return _p.ss($, ($) => sh.ph.literal("include"))
        case 'missing data': return _p.ss($, ($) => sh.ph.literal("missing data"))
        case 'nothing': return _p.ss($, ($) => sh.ph.literal("nothing"))
        case 'optional': return _p.ss($, ($) => sh.ph.literal("optional"))
        case 'state': return _p.ss($, ($) => sh.ph.literal("state"))

        default: return _p.au($[0])
    }
})