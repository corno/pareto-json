import * as p_ from 'pareto-core/implementation/refiner'
import type * as p_i from 'pareto-core/interface/refiner'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

//schemas
import type * as s_in from "../../../schemas/parse_tree.js"
import type * as s_out from "../../../schemas/deserialized_json.js"
import type * as s_error from "../../../schemas/deserialization.js"

//dependencies
import * as api_astn_core from "astn-core/api"
import * as deser_primitives from "../../deserializers/primitives.js"

export const Value: p_i.Refiner<
    s_out.Value,
    s_error.JSONify_Error,
    s_in.Value
> = ($, abort) => {
    const range = api_astn_core.api.deserialization.transformers['parse tree']['full value range'].Value($)
    return {
        'range': range,
        'type': p_.from.state($.type).decide(
            ($): s_out.Value_Type => {
                switch ($[0]) {
                    case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
                        ($): s_out.Value_Type => {
                            switch ($[0]) {
                                case 'dictionary': return p_.option($, ($) => ['object', {
                                    'dictionary': $,
                                    'entries': p_.from.list($.entries).map(
                                        ($) => ({
                                            'key': $.id,
                                            'value': p_.from.optional($.assignment).decide(
                                                ($) => p_.from.optional($.value).decide(
                                                    ($) => Value($, abort),
                                                    () => abort({
                                                        'range': range,
                                                        'type': ['missing property', null]
                                                    }),
                                                ),
                                                () => abort({
                                                    'range': range,
                                                    'type': ['missing property', null]
                                                }),
                                            ),
                                        }))
                                }])
                                case 'group': return p_.option($, ($) => abort({
                                    'range': range,
                                    'type': ['group', null]
                                }))
                                case 'list': return p_.option($, ($) => ['array', {
                                    'items': p_.from.list($.items).map(
                                        ($) => Value($.value, abort))
                                }])
                                case 'nothing': return p_.option($, ($) => abort({
                                    'range': range,
                                    'type': ['nothing', null]
                                }))
                                case 'optional': return p_.option($, ($) => abort({
                                    'range': range,
                                    'type': ['optional', null]
                                }))
                                case 'state': return p_.option($, ($) => abort({
                                    'range': range,
                                    'type': ['state', null]
                                }))
                                case 'text': return p_.option($, ($): s_out.Value_Type => {
                                    const x = $
                                    return p_.from.state($.token.type).decide(
                                        ($): s_out.Value_Type => {
                                            switch ($[0]) {
                                                case 'quoted': return p_.option($, ($) => ['string', x])
                                                case 'apostrophed': return p_.option($, ($) => abort({
                                                    'range': range,
                                                    'type': ['apostrophed text', null]
                                                }))
                                                case 'undelimited': return p_.option($, ($): s_out.Value_Type => {
                                                    return x.token.value === "null"
                                                        ? ['null', x]
                                                        : x.token.value === "true"
                                                            ? ['boolean', { 'text': x, 'value': true }]
                                                            : x.token.value === "false"
                                                                ? ['boolean', { 'text': x, 'value': false }]
                                                                : ['number', {
                                                                    'text': x, 'value': deser_primitives.Number(
                                                                        x.token.value,
                                                                        ($) => abort({
                                                                            'range': range,
                                                                            'type': ['undelimited text', null]
                                                                        }),
                                                                    )
                                                                }]
                                                })
                                                case 'backticked': return p_.option($, ($) => abort({
                                                    'range': range,
                                                    'type': ['backticked text', null]
                                                }))
                                                default: return p_.exhaustive($[0])
                                            }
                                        })
                                })
                                default: return p_.exhaustive($[0])
                            }
                        }))
                    case 'include': return p_.option($, ($) => abort({
                        'range': range,
                        'type': ['include', null]
                    }))
                    case 'missing': return p_.option($, ($) => abort({
                        'range': range,
                        'type': ['missing data', null]
                    }))
                    default: return p_.exhaustive($[0])
                }
            })
    }
}