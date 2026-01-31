
import * as _p from "pareto-core/dist/refiner"

import {
    _p_cc,
} from "pareto-core/dist/change_context"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/json/unmarshall"

import * as t_out from "../../../../../interface/generated/liana/schemas/json/data"

import * as v_deserialize_number from "liana-core/dist/implementation/manual/primitives/integer/deserializers/decimal"

import * as v_deserialize_boolean from "liana-core/dist/implementation/manual/primitives/boolean/deserializers/true_false"

import * as v_unmarshalled_from_parse_tree from "astn-core/dist/implementation/manual/schemas/unmarshalled/refiners/parse_tree"

import * as v_parse_tree_to_location from "astn-core/dist/implementation/manual/schemas/parse_tree/transformers/location"

export const Document: t_signatures.Document = ($, abort) => Value(
    $,
    ($) => abort(
        $
    )
)

export const Value: t_signatures.Value = ($, abort) => _p_cc(
    v_unmarshalled_from_parse_tree.State(
        $,
        ($) => abort(
            ['expected a state', null]
        )
    ),
    ($) => _p.decide.text(
        $['option']['value'],
        ($t): t_out.Value => {
            switch ($t) {
                case 'array':
                    return _p_cc(
                        $['value'],
                        ($) => ['array', _p.list.map(
                            v_unmarshalled_from_parse_tree.List(
                                $,
                                ($) => abort(
                                    ['expected a list', null]
                                )
                            ),
                            ($) => Value(
                                $,
                                ($) => abort(
                                    $
                                )
                            )
                        )]
                    )
                case 'object':
                    return _p_cc(
                        $['value'],
                        ($) => ['object', _p_cc(
                            v_unmarshalled_from_parse_tree.State(
                                $,
                                ($) => abort(
                                    ['expected a state', null]
                                )
                            ),
                            ($) => _p.decide.text(
                                $['option']['value'],
                                ($t): t_out.Value.object_ => {
                                    switch ($t) {
                                        case 'key value array':
                                            return _p_cc(
                                                $['value'],
                                                ($) => ['key value array', _p.list.map(
                                                    v_unmarshalled_from_parse_tree.List(
                                                        $,
                                                        ($) => abort(
                                                            ['expected a list', null]
                                                        )
                                                    ),
                                                    ($) => _p_cc(
                                                        v_unmarshalled_from_parse_tree.Group(
                                                            $,
                                                            ($) => abort(
                                                                ['expected a group', null]
                                                            )
                                                        ),
                                                        ($) => ({
                                                            'key': _p_cc(
                                                                $.__get_entry(
                                                                    'key',
                                                                    ($) => abort(
                                                                        ['no such entry', "key"]
                                                                    )
                                                                ),
                                                                ($) => v_unmarshalled_from_parse_tree.Text(
                                                                    $,
                                                                    ($) => abort(
                                                                        ['expected a text', null]
                                                                    )
                                                                )
                                                            ),
                                                            'value': _p_cc(
                                                                $.__get_entry(
                                                                    'value',
                                                                    ($) => abort(
                                                                        ['no such entry', "value"]
                                                                    )
                                                                ),
                                                                ($) => Value(
                                                                    $,
                                                                    ($) => abort(
                                                                        $
                                                                    )
                                                                )
                                                            ),
                                                        })
                                                    )
                                                )]
                                            )
                                        case 'dictionary':
                                            return _p_cc(
                                                $['value'],
                                                ($) => ['dictionary', _p.dictionary.map(
                                                    v_unmarshalled_from_parse_tree.Dictionary(
                                                        $,
                                                        ($) => abort(
                                                            ['expected a dictionary', null]
                                                        )
                                                    ),
                                                    ($, id) => Value(
                                                        $,
                                                        ($) => abort(
                                                            $
                                                        )
                                                    )
                                                )]
                                            )
                                        default:
                                            return abort(
                                                ['unknown option', $['option']['value']]
                                            )
                                    }
                                }
                            )
                        )]
                    )
                case 'number':
                    return _p_cc(
                        $['value'],
                        ($) => ['number', _p_cc(
                            v_unmarshalled_from_parse_tree.State(
                                $,
                                ($) => abort(
                                    ['expected a state', null]
                                )
                            ),
                            ($) => _p.decide.text(
                                $['option']['value'],
                                ($t): t_out.Value.number_ => {
                                    switch ($t) {
                                        case 'integer':
                                            return _p_cc(
                                                $['value'],
                                                ($) => ['integer', v_deserialize_number.deserialize(
                                                    v_unmarshalled_from_parse_tree.Text(
                                                        $,
                                                        ($) => abort(
                                                            ['expected a text', null]
                                                        )
                                                    ),
                                                    ($) => abort(
                                                        ['not a valid number', null]
                                                    )
                                                )]
                                            )
                                        case 'float':
                                            return _p_cc(
                                                $['value'],
                                                ($) => ['float', v_deserialize_number.deserialize(
                                                    v_unmarshalled_from_parse_tree.Text(
                                                        $,
                                                        ($) => abort(
                                                            ['expected a text', null]
                                                        )
                                                    ),
                                                    ($) => abort(
                                                        ['not a valid number', null]
                                                    )
                                                )]
                                            )
                                        default:
                                            return abort(
                                                ['unknown option', $['option']['value']]
                                            )
                                    }
                                }
                            )
                        )]
                    )
                case 'string':
                    return _p_cc(
                        $['value'],
                        ($) => ['string', v_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(
                                ['expected a text', null]
                            )
                        )]
                    )
                case 'boolean':
                    return _p_cc(
                        $['value'],
                        ($) => ['boolean', v_deserialize_boolean.deserialize(
                            v_unmarshalled_from_parse_tree.Text(
                                $,
                                ($) => abort(
                                    ['expected a text', null]
                                )
                            ),
                            ($) => abort(
                                ['not a valid boolean', null]
                            )
                        )]
                    )
                case 'null':
                    return _p_cc(
                        $['value'],
                        ($) => ['null', v_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(
                                ['expected a nothing', null]
                            )
                        )]
                    )
                default:
                    return abort(
                        ['unknown option', $['option']['value']]
                    )
            }
        }
    )
)
