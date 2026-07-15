import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../interface/schemas/deserialize_json.js"

namespace declarations {
    export type Error = p_.Phrase_Serializer<
        s_in.Error
    >
    export type JSONify_Error = p_.Phrase_Serializer<
        s_in.JSONify_Error
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose_simple/deprecated"

//dependencies
import * as api_astn_core from "astn-core/api"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize astn parse tree': return p_.option($, ($) => api_astn_core.api.serializers['parse tree deserialization'].Error($))
            case 'jsonify': return p_.option($, ($) => JSONify_Error($))
            default: return p_.exhaustive($[0])
        }
    }
)

export const JSONify_Error: declarations.JSONify_Error = ($) => p_.from.state($.type).decide(
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