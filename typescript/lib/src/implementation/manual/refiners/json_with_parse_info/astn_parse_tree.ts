import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import p_list_from_text from 'pareto-core/dist/implementation/refiner/specials/list_from_text'

//data types
import * as d_out from "../../../../interface/data/json_with_parse_info"
import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_function from "../../../../interface/data/json_from_parse_tree"

//dependencies
import * as r_primitives_from_loc from "../primitives/list_of_characters"
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

export const Value: p_i.Refiner<
    d_out.Value,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const range = t_astn_parse_tree_to_location.Value($)
    return {
        'range': range,
        'type': p_.from.state($.type).decide(
            ($): d_out.Value_Type => {
                switch ($[0]) {
                    case 'concrete': return p_.ss($, ($) => p_.from.state($).decide(
                        ($): d_out.Value_Type => {
                            switch ($[0]) {
                                case 'dictionary': return p_.ss($, ($) => ['object', {
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
                                case 'group': return p_.ss($, ($) => abort({
                                    'range': range,
                                    'type': ['group', null]
                                }))
                                case 'list': return p_.ss($, ($) => ['array', {
                                    'items': p_.from.list($.items).map(
                                        ($) => Value($.value, abort))
                                }])
                                case 'nothing': return p_.ss($, ($) => abort({
                                    'range': range,
                                    'type': ['nothing', null]
                                }))
                                case 'optional': return p_.ss($, ($) => abort({
                                    'range': range,
                                    'type': ['optional', null]
                                }))
                                case 'state': return p_.ss($, ($) => abort({
                                    'range': range,
                                    'type': ['state', null]
                                }))
                                case 'text': return p_.ss($, ($): d_out.Value_Type => {
                                    const x = $
                                    return p_.from.state($.token.type).decide(
                                        ($): d_out.Value_Type => {
                                            switch ($[0]) {
                                                case 'quoted': return p_.ss($, ($) => ['string', x])
                                                case 'apostrophed': return p_.ss($, ($) => abort({
                                                    'range': range,
                                                    'type': ['apostrophed text', null]
                                                }))
                                                case 'undelimited': return p_.ss($, ($): d_out.Value_Type => {
                                                    return x.token.value === "null"
                                                        ? ['null', x]
                                                        : x.token.value === "true"
                                                            ? ['boolean', { 'text': x, 'value': true }]
                                                            : x.token.value === "false"
                                                                ? ['boolean', { 'text': x, 'value': false }]
                                                                : ['number', {
                                                                    'text': x, 'value': r_primitives_from_loc.Number(
                                                                        p_list_from_text(
                                                                            x.token.value,
                                                                            ($) => $,
                                                                        ),
                                                                        ($) => abort({
                                                                            'range': range,
                                                                            'type': ['undelimited text', null]
                                                                        }),
                                                                    )
                                                                }]
                                                })
                                                case 'backticked': return p_.ss($, ($) => abort({
                                                    'range': range,
                                                    'type': ['backticked text', null]
                                                }))
                                                default: return p_.au($[0])
                                            }
                                        })
                                })
                                default: return p_.au($[0])
                            }
                        }))
                    case 'include': return p_.ss($, ($) => abort({
                        'range': range,
                        'type': ['include', null]
                    }))
                    case 'missing': return p_.ss($, ($) => abort({
                        'range': range,
                        'type': ['missing data', null]
                    }))
                    default: return p_.au($[0])
                }
            })
    }
}