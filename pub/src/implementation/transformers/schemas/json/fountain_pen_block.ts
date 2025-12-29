import * as _pt from 'pareto-core-transformer'

import * as d_in from "../../../../interface/generated/pareto/schemas/json/data_types/source"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data_types/target"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

import { $$ as op_enrich_list_elements_with_position_information } from "pareto-fountain-pen/dist/implementation/temp/enrich_with_position_information"
import { $$ as s_quoted } from "../../../serializers/primitives/text/quoted"


const String = (
    $: string //FIX should have been a schema type
): d_out.Block_Part => sh.b.snippet(s_quoted($))

export const Value = ($: d_in.Value): d_out.Block_Part => {
    return _pt.cc($, ($) => {
        switch ($[0]) {
            case 'object': return _pt.ss($, ($) => sh.b.sub([
                sh.b.snippet("{"),
                sh.b.indent([
                    _pt.cc($, ($): d_out.Group_Part => {
                        switch ($[0]) {
                            case 'dictionary': return _pt.ss($, ($) => sh.g.sub(op_enrich_list_elements_with_position_information($.to_list(($, key) => ({ 'key': key, 'value': $ }))).map(($) => sh.g.nested_block([
                                String($.value.key),
                                sh.b.snippet(": "),
                                Value($.value.value),
                                $['is last'] ? sh.b.nothing() : sh.b.snippet(","),
                            ]))))
                            case 'key value array': return _pt.ss($, ($) => sh.g.sub(op_enrich_list_elements_with_position_information($).map(($) => sh.g.nested_block([
                                String($.value.key),
                                sh.b.snippet(": "),
                                Value($.value.value),
                                $['is last'] ? sh.b.nothing() : sh.b.snippet(", "),
                            ]))))
                            default: return _pt.au($[0])
                        }
                    }),
                ]),
                sh.b.snippet("}"),
            ]))
            case 'array': return _pt.ss($, ($) => _pt.cc($, ($) => sh.b.sub([
                sh.b.snippet("["),
               sh.b.sub(op_enrich_list_elements_with_position_information($).map(($) => sh.b.sub([
                    Value($.value),
                    $['is last'] ? sh.b.nothing() : sh.b.snippet(", "),
                ]))),
                sh.b.snippet("]"),
            ])))
            case 'null': return _pt.ss($, ($) => sh.b.snippet("null"))
            case 'boolean': return _pt.ss($, ($) => sh.b.snippet($ ? "true" : "false"))
            case 'null': return _pt.ss($, ($) => sh.b.snippet("null"))
            case 'number': return _pt.ss($, ($) => _pt.cc($, ($) => {
                switch ($[0]) {
                    case 'integer': return _pt.ss($, ($) => sh.b.snippet("FIXME INTEGER"))
                    case 'float': return _pt.ss($, ($) => sh.b.snippet("FIXME FLOAT"))
                    default: return _pt.au($[0])
                }
            }))
            case 'string': return _pt.ss($, ($) => String($))
            default: return _pt.au($[0])
        }
    })
}

export const Document = ($: d_in.Document): d_out.Group => sh.group([ sh.g.nested_block([
    Value($),
])])
