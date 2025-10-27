import * as _ea from 'exupery-core-alg'

import * as d_in from "../../generated/interface/schemas/json/data_types/source"
import * as d_out from "pareto-fountain-pen/dist/generated/interface/schemas/block/data_types/target"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

import { $$ as op_enrich_list_elements_with_position_information } from "pareto-standard-operations/dist/operations/impure/list/enrich_with_position_information"
import { $$ as op_serialize_with_quote_delimiter } from "../../operations/impure/text/serialize_string"
import { $$ as op_dictionary_to_list } from "pareto-standard-operations/dist/operations/impure/dictionary/to_list_sorted_by_code_point"


const String = (
    $: string //FIX should have been a schema type
): d_out.Line_Part => sh.l.snippet(op_serialize_with_quote_delimiter($))

export const Value = ($: d_in.Value): d_out.Line_Part => {
    return _ea.cc($, ($) => {
        switch ($[0]) {
            case 'object': return _ea.ss($, ($) => sh.l.sub([
                sh.l.snippet("{"),
                sh.l.indent([
                    _ea.cc($, ($): d_out.Group_Part => {
                        switch ($[0]) {
                            case 'dictionary': return _ea.ss($, ($) => sh.g.sub(op_enrich_list_elements_with_position_information(op_dictionary_to_list($)).map(($) => sh.g.nested_line([
                                String($.value.key),
                                sh.l.snippet(": "),
                                Value($.value.value),
                                $['is last'] ? sh.l.nothing() : sh.l.snippet(","),
                            ]))))
                            case 'key value array': return _ea.ss($, ($) => sh.g.sub(op_enrich_list_elements_with_position_information($).map(($) => sh.g.nested_line([
                                String($.value.key),
                                sh.l.snippet(": "),
                                Value($.value.value),
                                $['is last'] ? sh.l.nothing() : sh.l.snippet(", "),
                            ]))))
                            default: return _ea.au($[0])
                        }
                    }),
                ]),
                sh.l.snippet("}"),
            ]))
            case 'array': return _ea.ss($, ($) => _ea.cc($, ($) => sh.l.sub([
                sh.l.snippet("["),
               sh.l.sub(op_enrich_list_elements_with_position_information($).map(($) => sh.l.sub([
                    Value($.value),
                    $['is last'] ? sh.l.nothing() : sh.l.snippet(", "),
                ]))),
                sh.l.snippet("]"),
            ])))
            case 'null': return _ea.ss($, ($) => sh.l.snippet("null"))
            case 'boolean': return _ea.ss($, ($) => sh.l.snippet($ ? "true" : "false"))
            case 'null': return _ea.ss($, ($) => sh.l.snippet("null"))
            case 'number': return _ea.ss($, ($) => _ea.cc($, ($) => {
                switch ($[0]) {
                    case 'integer': return _ea.ss($, ($) => sh.l.snippet("FIXME INTEGER"))
                    case 'float': return _ea.ss($, ($) => sh.l.snippet("FIXME FLOAT"))
                    default: return _ea.au($[0])
                }
            }))
            case 'string': return _ea.ss($, ($) => String($))
            default: return _ea.au($[0])
        }
    })
}

export const Document = ($: d_in.Document): d_out.Group => sh.group([ sh.g.nested_line([
    Value($),
])])
