import * as pt from 'pareto-core/dist/transformer/implementation'

//data types
import * as d_in from "../../../../interface/to_be_generated/json_from_parse_tree"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

//dependencies


export const Error = ($: d_in.Error): d_out.Phrase => pt.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'missing property': return pt.ss($, ($) => sh.ph.literal("missing property"))
        case 'apostrophed text': return pt.ss($, ($) => sh.ph.literal("apostrophed text"))
        case 'backticked text': return pt.ss($, ($) => sh.ph.literal("backticked text"))
        case 'undelimited text': return pt.ss($, ($) => sh.ph.literal("undelimited text"))
        case 'group': return pt.ss($, ($) => sh.ph.literal("group"))
        case 'include': return pt.ss($, ($) => sh.ph.literal("include"))
        case 'missing data': return pt.ss($, ($) => sh.ph.literal("missing data"))
        case 'nothing': return pt.ss($, ($) => sh.ph.literal("nothing"))
        case 'optional': return pt.ss($, ($) => sh.ph.literal("optional"))
        case 'state': return pt.ss($, ($) => sh.ph.literal("state"))

        default: return pt.au($[0])
    }
})