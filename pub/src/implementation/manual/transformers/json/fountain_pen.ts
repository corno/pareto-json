import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/json/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

//dependencies
import { $$ as s_quoted } from "../../primitives/text/serializers/quoted"
import { serialize as s_decimal } from "../../primitives/integer/fractional_decimal"
import { serialize as s_scientific_notation } from "../../primitives/approximate_number/scientific_notation"

const String = (
    $: string //FIX should have been a schema type
): d_out.Phrase => sh.ph.serialize(s_quoted($))

export const Value = ($: d_in.Value): d_out.Phrase => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'object': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("{"),
            sh.ph.indent(
                sh.pg.rich(
                    _p.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'dictionary': return _p.ss($, ($) => $.__to_list(($, id) => sh.sentence([
                                String(id),
                                sh.ph.literal(": "),
                                Value($)
                            ])))
                            case 'key value array': return _p.ss($, ($) => $.__l_map(($) => sh.sentence([
                                String($.key),
                                sh.ph.literal(": "),
                                Value($.value)
                            ])))

                            default: return _p.au($[0])
                        }
                    }),
                    null,
                    false,
                    null,
                    sh.ph.literal(","),
                    null,
                ),

            ),
            sh.ph.literal("}"),
        ]))
        case 'array': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("["),
            sh.ph.rich(
                $.__l_map(($) => Value($)),
                sh.ph.nothing(),
                sh.ph.nothing(),
                sh.ph.literal(", "),
                sh.ph.nothing(),
            ),
            sh.ph.literal("]"),
        ]))
        case 'null': return _p.ss($, ($) => sh.ph.literal("null"))
        case 'boolean': return _p.ss($, ($) => sh.ph.literal($ ? "true" : "false"))
        case 'null': return _p.ss($, ($) => sh.ph.literal("null"))
        case 'number': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'integer': return _p.ss($, ($) => sh.ph.serialize(s_decimal($, { 'number of fractional digits': 0 })))
                case 'float': return _p.ss($, ($) => sh.ph.serialize(s_scientific_notation($, { 'digits': 15 })))
                default: return _p.au($[0])
            }
        }))
        case 'string': return _p.ss($, ($) => String($))
        default: return _p.au($[0])
    }
})

export const Document = ($: d_in.Document_): d_out.Paragraph => sh.pg.sentences([
    sh.sentence([
        Value($)
    ])
])
