import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/json_from_parse_tree_refiner.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"


export namespace interface_ {

    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >

}

export const Error: interface_.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'missing property': return p_.option($, ($) => sh.ph.literal("missing property"))
            case 'apostrophed text': return p_.option($, ($) => sh.ph.literal("apostrophed text"))
            case 'backticked text': return p_.option($, ($) => sh.ph.literal("backticked text"))
            case 'undelimited text': return p_.option($, ($) => sh.ph.literal("undelimited text"))
            case 'group': return p_.option($, ($) => sh.ph.literal("group"))
            case 'include': return p_.option($, ($) => sh.ph.literal("include"))
            case 'missing data': return p_.option($, ($) => sh.ph.literal("missing data"))
            case 'nothing': return p_.option($, ($) => sh.ph.literal("nothing"))
            case 'optional': return p_.option($, ($) => sh.ph.literal("optional"))
            case 'state': return p_.option($, ($) => sh.ph.literal("state"))

            default: return p_.exhaustive($[0])
        }
    })