
import * as _p from "pareto-core/dist/transformer"

import { 
    _p_unreachable_code_path, 
} from "pareto-core/dist/unreachable_code_path"

import { 
    _p_cc, 
} from "pareto-core/dist/change_context"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/json/marshall"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_serialize_number from "liana-core/dist/implementation/manual/primitives/integer/serializers/decimal"

import * as v_serialize_boolean from "liana-core/dist/implementation/manual/primitives/boolean/serializers/true_false"
export const Value: t_signatures.Value = ($) => ['state', _p.decide.state(
    $, 
    ($): t_out.Value.state => {
        switch ($[0]) {
            case 'array':
                return _p.ss(
                    $, 
                    ($) => ({
                        'option': 'array',
                        'value': ['list', $.__l_map(
                            ($) => Value(
                                $
                            )
                        )],
                    })
                )
            case 'object':
                return _p.ss(
                    $, 
                    ($) => ({
                        'option': 'object',
                        'value': ['state', _p.decide.state(
                            $, 
                            ($): t_out.Value.state => {
                                switch ($[0]) {
                                    case 'key value array':
                                        return _p.ss(
                                            $, 
                                            ($) => ({
                                                'option': 'key value array',
                                                'value': ['list', $.__l_map(
                                                    ($) => ['group', ['verbose', _p.dictionary.literal(
                                                        ({
                                                            'key': _p_cc(
                                                                $['key'], 
                                                                ($) => ['text', ({
                                                                    'delimiter': ['quote', null],
                                                                    'value': $,
                                                                })]
                                                            ),
                                                            'value': _p_cc(
                                                                $['value'], 
                                                                ($) => Value(
                                                                    $
                                                                )
                                                            ),
                                                        })
                                                    )]]
                                                )],
                                            })
                                        )
                                    case 'dictionary':
                                        return _p.ss(
                                            $, 
                                            ($) => ({
                                                'option': 'dictionary',
                                                'value': ['dictionary', $.__d_map(
                                                    ($,id) => Value(
                                                        $
                                                    )
                                                )],
                                            })
                                        )
                                    default:
                                        return _p.au(
                                            $[0]
                                        )
                                }
                            }
                        )],
                    })
                )
            case 'number':
                return _p.ss(
                    $, 
                    ($) => ({
                        'option': 'number',
                        'value': ['state', _p.decide.state(
                            $, 
                            ($): t_out.Value.state => {
                                switch ($[0]) {
                                    case 'integer':
                                        return _p.ss(
                                            $, 
                                            ($) => ({
                                                'option': 'integer',
                                                'value': ['text', ({
                                                    'delimiter': ['none', null],
                                                    'value': v_serialize_number.serialize(
                                                        $
                                                    ),
                                                })],
                                            })
                                        )
                                    case 'float':
                                        return _p.ss(
                                            $, 
                                            ($) => ({
                                                'option': 'float',
                                                'value': ['text', ({
                                                    'delimiter': ['none', null],
                                                    'value': v_serialize_number.serialize(
                                                        $
                                                    ),
                                                })],
                                            })
                                        )
                                    default:
                                        return _p.au(
                                            $[0]
                                        )
                                }
                            }
                        )],
                    })
                )
            case 'string':
                return _p.ss(
                    $, 
                    ($) => ({
                        'option': 'string',
                        'value': ['text', ({
                            'delimiter': ['quote', null],
                            'value': $,
                        })],
                    })
                )
            case 'boolean':
                return _p.ss(
                    $, 
                    ($) => ({
                        'option': 'boolean',
                        'value': ['text', ({
                            'delimiter': ['none', null],
                            'value': v_serialize_boolean.serialize(
                                $
                            ),
                        })],
                    })
                )
            case 'null':
                return _p.ss(
                    $, 
                    ($) => ({
                        'option': 'null',
                        'value': ['nothing', null],
                    })
                )
            default:
                return _p.au(
                    $[0]
                )
        }
    }
)]
export const Document: t_signatures.Document = ($) => Value(
    $
)
