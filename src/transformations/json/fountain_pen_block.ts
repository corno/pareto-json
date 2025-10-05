import * as _ea from 'exupery-core-alg'

import * as d_in from "../../generated/interface/schemas/json/data_types/source"
import * as d_out from "pareto-fountain-pen/dist/generated/interface/schemas/block/data_types/target"

import {
    b, l, block
} from "pareto-fountain-pen/dist/shorthands/block"

import { $$ as op_enrich_list_elements_with_position_information } from "pareto-standard-operations/dist/impure/list/enrich_with_position_information"
import { $$ as op_serialize_with_quote_delimiter } from "../../operations/impure/serialize_string"
import { $$ as op_dictionary_to_list } from "pareto-standard-operations/dist/impure/dictionary/to_list_sorted_by_code_point"


const String = (
    $: string //FIX should have been a schema type
): d_out.Line_Part => l.snippet(op_serialize_with_quote_delimiter($))

export const Value = ($: d_in.Value): d_out.Line_Part => {
    return _ea.cc($, ($) => {
        switch ($[0]) {
            case 'object': return _ea.ss($, ($) => l.sub([
                l.snippet("{"),
                l.indent([
                    _ea.cc($, ($): d_out.Block_Part => {
                        switch ($[0]) {
                            case 'dictionary': return _ea.ss($, ($) => b.sub(op_enrich_list_elements_with_position_information(op_dictionary_to_list($)).map(($) => b.nested_line([
                                String($.value.key),
                                l.snippet(": "),
                                Value($.value.value),
                                $['is last'] ? l.nothing() : l.snippet(","),
                            ]))))
                            case 'key value array': return _ea.ss($, ($) => b.sub(op_enrich_list_elements_with_position_information($).map(($) => b.nested_line([
                                String($.value.key),
                                l.snippet(": "),
                                Value($.value.value),
                                $['is last'] ? l.nothing() : l.snippet(", "),
                            ]))))
                            default: return _ea.au($[0])
                        }
                    }),
                ]),
                l.snippet("}"),
            ]))
            case 'array': return _ea.ss($, ($) => _ea.cc($, ($) => l.sub([
                l.snippet("["),
                l.sub(op_enrich_list_elements_with_position_information($).map(($) => l.sub([
                    Value($.value),
                    $['is last'] ? l.nothing() : l.snippet(", "),
                ]))),
                l.snippet("]"),
            ])))
            case 'null': return _ea.ss($, ($) => l.snippet("null"))
            case 'boolean': return _ea.ss($, ($) => l.snippet($ ? "true" : "false"))
            case 'null': return _ea.ss($, ($) => l.snippet("null"))
            case 'number': return _ea.ss($, ($) => _ea.cc($, ($) => {
                switch ($[0]) {
                    case 'integer': return _ea.ss($, ($) => l.snippet("FIXME INTEGER"))
                    case 'float': return _ea.ss($, ($) => l.snippet("FIXME FLOAT"))
                    default: return _ea.au($[0])
                }
            }))
            case 'string': return _ea.ss($, ($) => String($))
            default: return _ea.au($[0])
        }
    })
}

export const Document = ($: d_in.Document): d_out.Block => block([b.nested_line([
    Value($),
])])
