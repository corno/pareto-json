import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "./schema.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
    export type JSONify_Error = p_.Serializer<
        s_in.JSONify_Error
    >
}

//dependencies
import * as ser_parse_tree from "astn-core/modules/deserialization/schemas/parse_tree_deserialization/serializers"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize astn parse tree': return p_.option($, ($) => ser_parse_tree.Error($))
            case 'jsonify': return p_.option($, ($) => JSONify_Error($))
            default: return p_.exhaustive($[0])
        }
    }
)

export const JSONify_Error: declarations.JSONify_Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'missing property': return p_.option($, ($) => p_.ph.literal("missing property"))
            case 'apostrophed text': return p_.option($, ($) => p_.ph.literal("apostrophed text"))
            case 'backticked text': return p_.option($, ($) => p_.ph.literal("backticked text"))
            case 'undelimited text': return p_.option($, ($) => p_.ph.literal("undelimited text"))
            case 'group': return p_.option($, ($) => p_.ph.literal("group"))
            case 'include': return p_.option($, ($) => p_.ph.literal("include"))
            case 'missing data': return p_.option($, ($) => p_.ph.literal("missing data"))
            case 'nothing': return p_.option($, ($) => p_.ph.literal("nothing"))
            case 'optional': return p_.option($, ($) => p_.ph.literal("optional"))
            case 'state': return p_.option($, ($) => p_.ph.literal("state"))

            default: return p_.exhaustive($[0])
        }
    })