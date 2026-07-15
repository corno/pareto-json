import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../interface/schemas/json_unmarshalling.js"
import type * as s_out from "../../interface/schemas/paragraph.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/paragraph/deprecated"

export const Error: declarations.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'unexpected properties': return p_.option($, ($) => sh.ph.composed([
                sh.ph.text("unexpected properties:"),
                sh.ph.indent(
                    sh.pg.sentences(p_.from.dictionary($['unexpected properties']).convert_to_list(
                        ($, key) => sh.sentence([
                            sh.ph.text(key),
                            // sh.ph.text(": "),
                            // t_astn_location_to_prose.Range($, {'character location reporting': }),
                        ])))
                ),
            ]))
            case 'missing property': return p_.option($, ($) => sh.ph.text("missing property"))
            case 'unexpected type': return p_.option($, ($) => sh.ph.composed([
                sh.ph.text("unexpected type, expected:"),
                sh.ph.indent(
                    sh.pg.sentences(
                        p_.from.list($.expected).map(
                            ($) => sh.sentence([
                                sh.ph.text($),
                            ])
                        )
                    )
                ),
            ]))
            case 'unexpected enum value': return p_.option($, ($) => sh.ph.composed([
                sh.ph.text("unexpected enum value, expected:"),
                sh.ph.indent(
                    sh.pg.sentences(p_.from.list($.expected).map(
                        ($) => sh.sentence([
                            sh.ph.text($),
                        ])))
                ),
            ]))
            case 'multiple properties with this key': return p_.option($, ($) => sh.ph.text("multiple properties with this key: " + $))

            default: return p_.exhaustive($[0])
        }
    })