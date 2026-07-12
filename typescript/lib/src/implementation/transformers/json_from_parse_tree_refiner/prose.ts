import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/json_from_parse_tree_refiner.js"
import type * as s_out from "../../../interface/schemas/prose.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: declarations.Error = ($) => p_.from.state($.type).decide(
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