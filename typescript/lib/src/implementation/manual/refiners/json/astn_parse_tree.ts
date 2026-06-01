import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_out from "../../../../interface/to_be_generated/json"
import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_function from "../../../../interface/to_be_generated/json_from_parse_tree"

//dependencies
import * as r_primitives_from_loc from "../primitives/list_of_characters"
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/full_value_range"

export const Value: _pi.Refiner<
    d_out.Value,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const range = t_astn_parse_tree_to_location.Value($)
    return {
        'range': range,
        'type': _p.decide.state($.type, ($): d_out.Value_Type => {
            switch ($[0]) {
                case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($): d_out.Value_Type => {
                    switch ($[0]) {
                        case 'dictionary': return _p.ss($, ($) => ['object', {
                            'dictionary': $,
                            'entries': $.entries.__l_map(($) => ({
                                'key': $.id,
                                'value': $.assignment.__decide(
                                    ($) => $.value.__decide(
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
                        case 'group': return _p.ss($, ($) => abort({
                            'range': range,
                            'type': ['group', null]
                        }))
                        case 'list': return _p.ss($, ($) => ['array', {
                            'items': $.items.__l_map(($) => Value($.value, abort))
                        }])
                        case 'nothing': return _p.ss($, ($) => abort({
                            'range': range,
                            'type': ['nothing', null]
                        }))
                        case 'optional': return _p.ss($, ($) => abort({
                            'range': range,
                            'type': ['optional', null]
                        }))
                        case 'state': return _p.ss($, ($) => abort({
                            'range': range,
                            'type': ['state', null]
                        }))
                        case 'text': return _p.ss($, ($): d_out.Value_Type => {
                            const x = $
                            return _p.decide.state($.token.type, ($): d_out.Value_Type => {
                                switch ($[0]) {
                                    case 'quoted': return _p.ss($, ($) => ['string', x.token.value])
                                    case 'apostrophed': return _p.ss($, ($) => abort({
                                        'range': range,
                                        'type': ['apostrophed text', null]
                                    }))
                                    case 'undelimited': return _p.ss($, ($): d_out.Value_Type => {
                                        return x.token.value === "null"
                                            ? ['null', null]
                                            : x.token.value === "true"
                                                ? ['boolean', true]
                                                : x.token.value === "false"
                                                    ? ['boolean', false]
                                                    : ['number', r_primitives_from_loc.Number(
                                                        _p_list_from_text(
                                                            x.token.value,
                                                            ($) => $,
                                                        ),
                                                        ($) => abort({
                                                            'range': range,
                                                            'type': ['undelimited text', null]
                                                        }),
                                                    )]
                                    })
                                    case 'backticked': return _p.ss($, ($) => abort({
                                        'range': range,
                                        'type': ['backticked text', null]
                                    }))
                                    default: return _p.au($[0])
                                }
                            })
                        })
                        default: return _p.au($[0])
                    }
                }))
                case 'include': return _p.ss($, ($) => abort({
                    'range': range,
                    'type': ['include', null]
                }))
                case 'missing': return _p.ss($, ($) => abort({
                    'range': range,
                    'type': ['missing data', null]
                }))
                default: return _p.au($[0])
            }
        })
    }
}