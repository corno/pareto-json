import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../interface/schemas/json_with_guaranteed_unique_keys.js"

namespace declarations {

    export type Value = p_.Phrase_Serializer<
        s_in.Value
    >

    export type Document_ = p_.Paragraph_Serializer<
        s_in.Document
    >

    export type String = p_.Phrase_Serializer<
        string //should have been a schema type
    >

}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose_extended/deprecated"

//dependencies
import * as t_primitives_to_loc from "./primitives.js"

const String: declarations.String = ($) => t_primitives_to_loc.String($)

export const Value: declarations.Value = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'object': return p_.option($, ($) => sh.ph.rich_paragraph(
                p_.from.dictionary($).convert_to_list(
                    ($, id) => sh.sentence([
                        String(id),
                        sh.ph.literal(": "),
                        Value($)
                    ])),
                sh.ph.nothing(),
                sh.ph.literal("{"),
                sh.ph.literal(","),
                sh.ph.literal("}"),
            ))
            case 'array': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("["),
                sh.ph.rich_phrase(
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
                        case 'integer': return p_.option($, ($) => t_primitives_to_loc.Fractional_Decimal(
                            $,
                            {
                                'number of fractional digits': 0
                            }
                        ))
                        case 'float': return p_.option($, ($) => t_primitives_to_loc.Float(
                            $,
                            {
                                'digits': 15
                            }
                        ))
                        default: return p_.exhaustive($[0])
                    }
                }))
            case 'string': return p_.option($, ($) => String($))
            default: return p_.exhaustive($[0])
        }
    })

export const Document: declarations.Document_ = ($) => sh.pg.sentences([sh.sentence([Value($)])])
