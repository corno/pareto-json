import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../schemas/with_guaranteed_unique_keys.js"
import type * as s_out from "../../../schemas/paragraph.js"

namespace declarations {

    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Phrase
    >

    export type Document_ = p_.Transformer<
        s_in.Document,
        s_out.Paragraph
    >

    export type String = p_.Transformer<
        string, //should have been a schema type
        s_out.Phrase
    >

}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/paragraph/deprecated"

//dependencies
import * as t_primitives_to_loc from "../../serializers/primitives.js"

const String: declarations.String = ($) => sh.ph.text(t_primitives_to_loc.String($))

export const Value: declarations.Value = ($) => p_.from.state($).decide(
    ($): s_out.Phrase => {
        switch ($[0]) {
            case 'object': return p_.option($, ($) => sh.ph.composed([
                sh.ph.text("{"),
                sh.ph.rich_paragraph(
                    p_.from.dictionary($).convert_to_list(
                        ($, id) => sh.sentence([
                            String(id),
                            sh.ph.text(": "),
                            Value($)
                        ])),
                    sh.ph.nothing(),
                    sh.ph.nothing(),
                    sh.ph.text(","),
                    sh.ph.nothing(),
                ),
                sh.ph.text("}"),

            ]))
            case 'array': return p_.option($, ($) => sh.ph.composed([
                sh.ph.text("["),
                sh.ph.rich_phrase(
                    p_.from.list($).map(
                        ($) => sh.ph.composed([
                            sh.ph.text(" "),
                            Value($),
                        ])),
                    sh.ph.nothing(),
                    sh.ph.nothing(),
                    sh.ph.text(","),
                    sh.ph.nothing(),
                ),
                sh.ph.text(" ]"),
            ]))
            case 'null': return p_.option($, ($) => sh.ph.text("null"))
            case 'boolean': return p_.option($, ($) => sh.ph.text($ ? "true" : "false"))
            case 'null': return p_.option($, ($) => sh.ph.text("null"))
            case 'number': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'integer': return p_.option($, ($) => sh.ph.text(t_primitives_to_loc.Fractional_Decimal(
                            $,
                            {
                                'number of fractional digits': 0
                            }
                        )))
                        case 'float': return p_.option($, ($) => sh.ph.text(t_primitives_to_loc.Float(
                            $,
                            {
                                'digits': 15
                            }
                        )))
                        default: return p_.exhaustive($[0])
                    }
                }))
            case 'string': return p_.option($, ($) => String($))
            default: return p_.exhaustive($[0])
        }
    })

export const Document: declarations.Document_ = ($) => sh.pg.sentences([sh.sentence([Value($)])])
