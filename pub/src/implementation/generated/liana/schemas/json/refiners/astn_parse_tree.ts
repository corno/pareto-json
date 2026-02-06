    
    import * as _p from 'pareto-core/dist/expression'
    
    import _p_change_context from 'pareto-core/dist/_p_change_context'
    
    import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
    
    import * as t_signatures from "../../../../../../interface/generated/liana/schemas/json/unmarshall"
    
    import * as t_out from "../../../../../../interface/generated/liana/schemas/json/data"
    
    import * as v_deserialize_number from "liana-core/dist/implementation/manual/primitives/integer/deserializers/decimal"
    
    import * as v_deserialize_boolean from "liana-core/dist/implementation/manual/primitives/boolean/deserializers/true_false"
    
    import * as v_unmarshalled_from_parse_tree from "astn-core/dist/implementation/manual/schemas/unmarshalled/refiners/parse_tree"
    
    import * as v_parse_tree_to_location from "astn-core/dist/implementation/manual/schemas/parse_tree/transformers/location"
    
    export const Document: t_signatures.Document = ($, abort) => Value(
        $,
        ($) => abort(
            $,
        ),
    )
    
    export const Value: t_signatures.Value = ($, abort) => _p_change_context(
        v_unmarshalled_from_parse_tree.State(
            $,
            ($) => abort(
                ['expected a state', null],
            ),
        ),
        ($) => _p.decide.text(
            $['option']['value'],
            ($t): t_out.Value => {
                switch ($t) {
                    case 'array':
                        return _p_change_context(
                            $['value'],
                            ($) => ['array', _p.list.map(
                                v_unmarshalled_from_parse_tree.List(
                                    $,
                                    ($) => abort(
                                        ['expected a list', null],
                                    ),
                                ),
                                ($) => Value(
                                    $,
                                    ($) => abort(
                                        $,
                                    ),
                                ),
                            )],
                        )
                    case 'object':
                        return _p_change_context(
                            $['value'],
                            ($) => ['object', _p_change_context(
                                v_unmarshalled_from_parse_tree.State(
                                    $,
                                    ($) => abort(
                                        ['expected a state', null],
                                    ),
                                ),
                                ($) => _p.decide.text(
                                    $['option']['value'],
                                    ($t): t_out.Value.object_ => {
                                        switch ($t) {
                                            case 'key value array':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['key value array', _p.list.map(
                                                        v_unmarshalled_from_parse_tree.List(
                                                            $,
                                                            ($) => abort(
                                                                ['expected a list', null],
                                                            ),
                                                        ),
                                                        ($) => _p_change_context(
                                                            v_unmarshalled_from_parse_tree.Group(
                                                                $,
                                                                ($) => abort(
                                                                    ['expected a group', null],
                                                                ),
                                                            ),
                                                            ($) => ({
                                                                'key': _p_change_context(
                                                                    $.__get_entry(
                                                                        'key',
                                                                        ($) => abort(
                                                                            ['no such entry', "key"],
                                                                        ),
                                                                    ),
                                                                    ($) => v_unmarshalled_from_parse_tree.Text(
                                                                        $,
                                                                        ($) => abort(
                                                                            ['expected a text', null],
                                                                        ),
                                                                    ),
                                                                ),
                                                                'value': _p_change_context(
                                                                    $.__get_entry(
                                                                        'value',
                                                                        ($) => abort(
                                                                            ['no such entry', "value"],
                                                                        ),
                                                                    ),
                                                                    ($) => Value(
                                                                        $,
                                                                        ($) => abort(
                                                                            $,
                                                                        ),
                                                                    ),
                                                                ),
                                                            }),
                                                        ),
                                                    )],
                                                )
                                            case 'dictionary':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['dictionary', _p.dictionary.map(
                                                        v_unmarshalled_from_parse_tree.Dictionary(
                                                            $,
                                                            ($) => abort(
                                                                ['expected a dictionary', null],
                                                            ),
                                                        ),
                                                        ($, id) => Value(
                                                            $,
                                                            ($) => abort(
                                                                $,
                                                            ),
                                                        ),
                                                    )],
                                                )
                                            default:
                                                return abort(
                                                    ['unknown option', $['option']['value']],
                                                )
                                        }
                                    },
                                ),
                            )],
                        )
                    case 'number':
                        return _p_change_context(
                            $['value'],
                            ($) => ['number', _p_change_context(
                                v_unmarshalled_from_parse_tree.State(
                                    $,
                                    ($) => abort(
                                        ['expected a state', null],
                                    ),
                                ),
                                ($) => _p.decide.text(
                                    $['option']['value'],
                                    ($t): t_out.Value.number_ => {
                                        switch ($t) {
                                            case 'integer':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['integer', v_deserialize_number.deserialize(
                                                        _p_list_from_text(
                                                            v_unmarshalled_from_parse_tree.Text(
                                                                $,
                                                                ($) => abort(
                                                                    ['expected a text', null],
                                                                ),
                                                            ),
                                                            ($) => $,
                                                        ),
                                                        ($) => abort(
                                                            ['not a valid number', null],
                                                        ),
                                                    )],
                                                )
                                            case 'float':
                                                return _p_change_context(
                                                    $['value'],
                                                    ($) => ['float', v_deserialize_number.deserialize(
                                                        _p_list_from_text(
                                                            v_unmarshalled_from_parse_tree.Text(
                                                                $,
                                                                ($) => abort(
                                                                    ['expected a text', null],
                                                                ),
                                                            ),
                                                            ($) => $,
                                                        ),
                                                        ($) => abort(
                                                            ['not a valid number', null],
                                                        ),
                                                    )],
                                                )
                                            default:
                                                return abort(
                                                    ['unknown option', $['option']['value']],
                                                )
                                        }
                                    },
                                ),
                            )],
                        )
                    case 'string':
                        return _p_change_context(
                            $['value'],
                            ($) => ['string', v_unmarshalled_from_parse_tree.Text(
                                $,
                                ($) => abort(
                                    ['expected a text', null],
                                ),
                            )],
                        )
                    case 'boolean':
                        return _p_change_context(
                            $['value'],
                            ($) => ['boolean', v_deserialize_boolean.deserialize(
                                _p_list_from_text(
                                    v_unmarshalled_from_parse_tree.Text(
                                        $,
                                        ($) => abort(
                                            ['expected a text', null],
                                        ),
                                    ),
                                    ($) => $,
                                ),
                                ($) => abort(
                                    ['not a valid boolean', null],
                                ),
                            )],
                        )
                    case 'null':
                        return _p_change_context(
                            $['value'],
                            ($) => ['null', v_unmarshalled_from_parse_tree.Nothing(
                                $,
                                ($) => abort(
                                    ['expected a nothing', null],
                                ),
                            )],
                        )
                    default:
                        return abort(
                            ['unknown option', $['option']['value']],
                        )
                }
            },
        ),
    )
