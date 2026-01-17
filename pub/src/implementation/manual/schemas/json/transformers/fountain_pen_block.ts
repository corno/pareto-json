import * as _p from 'pareto-core-transformer'

//data types
import * as d_in from "../../../../../interface/generated/pareto/schemas/json/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/block"

//dependencies
import { $$ as op_enrich_list_elements_with_position_information } from "pareto-fountain-pen/dist/implementation/temp/enrich_with_position_information"
import { $$ as s_quoted } from "../../../primitives/text/serializers/quoted"
import { $$ as s_decimal } from "../../../primitives/integer/serializers/fractional_decimal"
import { $$ as s_scientific_notation } from "../../../primitives/approximate_number/serializers/scientific_notation"

const String = (
    $: string //FIX should have been a schema type
): d_out.Block_Part => sh.b.snippet(s_quoted($))

export const Value = ($: d_in.Value): d_out.Block_Part => _p.sg($, ($) => {
    switch ($[0]) {
        case 'object': return _p.ss($, ($) => sh.b.sub([
            sh.b.snippet("{"),
            sh.b.indent([
                _p.sg($, ($): d_out.Group_Part => {
                    switch ($[0]) {
                        case 'dictionary': return _p.ss($, ($) => sh.g.list(op_enrich_list_elements_with_position_information(_p.list.from_dictionary($, ($, key) => ({ 'key': key, 'value': $ }))).__l_map(($) => sh.g.nested_block([
                            String($.value.key),
                            sh.b.snippet(": "),
                            Value($.value.value),
                            $['is last'] ? sh.b.nothing() : sh.b.snippet(","),
                        ]))))
                        case 'key value array': return _p.ss($, ($) => sh.g.list(op_enrich_list_elements_with_position_information($).__l_map(($) => sh.g.nested_block([
                            String($.value.key),
                            sh.b.snippet(": "),
                            Value($.value.value),
                            $['is last'] ? sh.b.nothing() : sh.b.snippet(", "),
                        ]))))
                        default: return _p.au($[0])
                    }
                }),
            ]),
            sh.b.snippet("}"),
        ]))
        case 'array': return _p.ss($, ($) => sh.b.sub([
            sh.b.snippet("["),
            sh.b.list(op_enrich_list_elements_with_position_information($).__l_map(($) => sh.b.sub([
                Value($.value),
                $['is last'] ? sh.b.nothing() : sh.b.snippet(", "),
            ]))),
            sh.b.snippet("]"),
        ]))
        case 'null': return _p.ss($, ($) => sh.b.snippet("null"))
        case 'boolean': return _p.ss($, ($) => sh.b.snippet($ ? "true" : "false"))
        case 'null': return _p.ss($, ($) => sh.b.snippet("null"))
        case 'number': return _p.ss($, ($) => _p.sg($, ($) => {
            switch ($[0]) {
                case 'integer': return _p.ss($, ($) => sh.b.snippet(s_decimal($, { 'number of fractional digits': 0 })))
                case 'float': return _p.ss($, ($) => sh.b.snippet(s_scientific_notation($, { 'digits': 15 })))
                default: return _p.au($[0])
            }
        }))
        case 'string': return _p.ss($, ($) => String($))
        default: return _p.au($[0])
    }
})

export const Document = ($: d_in.Document_): d_out.Group => sh.group([sh.g.nested_block([
    Value($),
])])
