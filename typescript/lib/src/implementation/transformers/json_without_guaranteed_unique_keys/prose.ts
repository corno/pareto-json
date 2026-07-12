import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/json_without_guaranteed_unique_keys.js"
import type * as s_out from "../../../interface/schemas/prose.js"

namespace declarations {

    export type String = p_i.Transformer<
        string, //should have been a schema type
        s_out.Phrase
    >

    export type Value = p_i.Transformer<
        s_in.Value,
        s_out.Phrase
    >

    export type Document_ = p_i.Transformer<
        s_in.Document_,
        s_out.Paragraph
    >

}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

//dependencies
import * as t_primitives_to_loc from "../primitives/deprecated_list_of_characters.js"

const String: declarations.String = ($) => sh.ph.serialize(t_primitives_to_loc.String($))

export const Value: declarations.Value = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'object': return p_.option($, ($) => sh.ph.composed([
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
            case 'array': return p_.option($, ($) => sh.ph.composed([
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
            case 'null': return p_.option($, ($) => sh.ph.literal("null"))
            case 'boolean': return p_.option($, ($) => sh.ph.literal($ ? "true" : "false"))
            case 'null': return p_.option($, ($) => sh.ph.literal("null"))
            case 'number': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'integer': return p_.option($, ($) => sh.ph.serialize(t_primitives_to_loc.Fractional_Decimal($, { 'number of fractional digits': 0 })))
                        case 'float': return p_.option($, ($) => sh.ph.serialize(t_primitives_to_loc.Float($, { 'digits': 15 })))
                        default: return p_.exhaustive($[0])
                    }
                }))
            case 'string': return p_.option($, ($) => String($))
            default: return p_.exhaustive($[0])
        }
    })

export const Document: declarations.Document_ = ($) => sh.pg.sentences([
    sh.sentence([
        Value($)
    ])
])
