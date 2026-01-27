
import * as _p from "pareto-core/dist/transformer"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/json/migrate_boilerplate"

import * as t_out from "../../../../../interface/generated/liana/schemas/json/data"
export const Value: t_signatures.Value = ($,) => _p.decide.state($, ($,): t_out.Value => {
    switch ($[0]) {
        case 'array':
            return _p.ss($, ($,) => ['array', $.__l_map(($,) => Value($))])
        case 'object':
            return _p.ss($, ($,) => ['object', _p.decide.state($, ($,): t_out.Value.object_ => {
                switch ($[0]) {
                    case 'key value array':
                        return _p.ss($, ($,) => ['key value array', $.__l_map(($,) => ({
                            'key': _p.deprecated_cc($['key'], ($,) => $),
                            'value': _p.deprecated_cc($['value'], ($,) => Value($)),
                        }))])
                    case 'dictionary':
                        return _p.ss($, ($,) => ['dictionary', $.__d_map(($,id,) => Value($))])
                    default:
                        return _p.au($[0])
                }
            })])
        case 'number':
            return _p.ss($, ($,) => ['number', _p.decide.state($, ($,): t_out.Value.number_ => {
                switch ($[0]) {
                    case 'integer':
                        return _p.ss($, ($,) => ['integer', $])
                    case 'float':
                        return _p.ss($, ($,) => ['float', $])
                    default:
                        return _p.au($[0])
                }
            })])
        case 'string':
            return _p.ss($, ($,) => ['string', $])
        case 'boolean':
            return _p.ss($, ($,) => ['boolean', $])
        case 'null':
            return _p.ss($, ($,) => ['null', null])
        default:
            return _p.au($[0])
    }
})
export const Document: t_signatures.Document = ($,) => Value($)
