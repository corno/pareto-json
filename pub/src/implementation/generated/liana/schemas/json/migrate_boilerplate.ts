
import * as _p from "pareto-core/dist/transformer"

import {
    _p_cc,
} from "pareto-core/dist/change_context"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/json/migrate_boilerplate"

import * as t_out from "../../../../../interface/generated/liana/schemas/json/data"

export const Value: t_signatures.Value = ($) => _p.decide.state(
    $,
    ($): t_out.Value => {
        switch ($[0]) {
            case 'array':
                return _p.ss(
                    $,
                    ($) => ['array', _p.list.map(
                        $,
                        ($) => Value(
                            $
                        )
                    )]
                )
            case 'object':
                return _p.ss(
                    $,
                    ($) => ['object', _p.decide.state(
                        $,
                        ($): t_out.Value.object_ => {
                            switch ($[0]) {
                                case 'key value array':
                                    return _p.ss(
                                        $,
                                        ($) => ['key value array', _p.list.map(
                                            $,
                                            ($) => ({
                                                'key': _p_cc(
                                                    $['key'],
                                                    ($) => $
                                                ),
                                                'value': _p_cc(
                                                    $['value'],
                                                    ($) => Value(
                                                        $
                                                    )
                                                ),
                                            })
                                        )]
                                    )
                                case 'dictionary':
                                    return _p.ss(
                                        $,
                                        ($) => ['dictionary', _p.dictionary.map(
                                            $,
                                            ($, id) => Value(
                                                $
                                            )
                                        )]
                                    )
                                default:
                                    return _p.au(
                                        $[0]
                                    )
                            }
                        }
                    )]
                )
            case 'number':
                return _p.ss(
                    $,
                    ($) => ['number', _p.decide.state(
                        $,
                        ($): t_out.Value.number_ => {
                            switch ($[0]) {
                                case 'integer':
                                    return _p.ss(
                                        $,
                                        ($) => ['integer', $]
                                    )
                                case 'float':
                                    return _p.ss(
                                        $,
                                        ($) => ['float', $]
                                    )
                                default:
                                    return _p.au(
                                        $[0]
                                    )
                            }
                        }
                    )]
                )
            case 'string':
                return _p.ss(
                    $,
                    ($) => ['string', $]
                )
            case 'boolean':
                return _p.ss(
                    $,
                    ($) => ['boolean', $]
                )
            case 'null':
                return _p.ss(
                    $,
                    ($) => ['null', null]
                )
            default:
                return _p.au(
                    $[0]
                )
        }
    }
)

export const Document: t_signatures.Document = ($) => Value(
    $
)
