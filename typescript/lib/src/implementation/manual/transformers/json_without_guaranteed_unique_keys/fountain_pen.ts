import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/json_without_guaranteed_unique_keys/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

namespace interface_ {

    export type String = p_i.Transformer<
        string, //should have been a schema type
        d_out.Phrase
    >

    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Phrase
    >

    export type Document_ = p_i.Transformer<
        d_in.Document_,
        d_out.Paragraph
    >

}

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

//dependencies
import * as t_primitives_to_loc from "../primitives/list_of_characters"

const String: interface_.String = ($) => sh.ph.serialize(t_primitives_to_loc.String($))

export const Value: interface_.Value = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'object': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("{"),
                sh.ph.indent(
                    sh.pg.rich(
                        p_.from.list($).map(
                            ($) => sh.sentence([
                                String($.key),
                                sh.ph.literal(": "),
                                Value($.value)
                            ])),
                        null,
                        false,
                        null,
                        sh.ph.literal(","),
                        null,
                    ),

                ),
                sh.ph.literal("}"),
            ]))
            case 'array': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("["),
                sh.ph.rich(
                    p_.from.list($).map(
                        ($) => sh.ph.composed([
                            sh.ph.literal(" "),
                            Value($),
                        ])),
                    sh.ph.nothing(),
                    sh.ph.nothing(),
                    sh.ph.literal(","),
                    sh.ph.nothing(),
                ),
                sh.ph.literal(" ]"),
            ]))
            case 'null': return p_.ss($, ($) => sh.ph.literal("null"))
            case 'boolean': return p_.ss($, ($) => sh.ph.literal($ ? "true" : "false"))
            case 'null': return p_.ss($, ($) => sh.ph.literal("null"))
            case 'number': return p_.ss($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'integer': return p_.ss($, ($) => sh.ph.serialize(t_primitives_to_loc.Fractional_Decimal($, { 'number of fractional digits': 0 })))
                        case 'float': return p_.ss($, ($) => sh.ph.serialize(t_primitives_to_loc.Float($, { 'digits': 15 })))
                        default: return p_.au($[0])
                    }
                }))
            case 'string': return p_.ss($, ($) => String($))
            default: return p_.au($[0])
        }
    })

export const Document: interface_.Document_ = ($) => sh.pg.sentences([
    sh.sentence([
        Value($)
    ])
])
