import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/json_from_parse_tree"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"


export namespace interface_ {

    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >

}

export const Error: interface_.Error = ($) => p_.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'missing property': return p_.ss($, ($) => sh.ph.literal("missing property"))
        case 'apostrophed text': return p_.ss($, ($) => sh.ph.literal("apostrophed text"))
        case 'backticked text': return p_.ss($, ($) => sh.ph.literal("backticked text"))
        case 'undelimited text': return p_.ss($, ($) => sh.ph.literal("undelimited text"))
        case 'group': return p_.ss($, ($) => sh.ph.literal("group"))
        case 'include': return p_.ss($, ($) => sh.ph.literal("include"))
        case 'missing data': return p_.ss($, ($) => sh.ph.literal("missing data"))
        case 'nothing': return p_.ss($, ($) => sh.ph.literal("nothing"))
        case 'optional': return p_.ss($, ($) => sh.ph.literal("optional"))
        case 'state': return p_.ss($, ($) => sh.ph.literal("state"))

        default: return p_.au($[0])
    }
})