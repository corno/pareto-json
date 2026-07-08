import * as p_ from 'pareto-core/implementation/transformer'

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

import type * as interface_ from "../../../../interface/declarations/transformers/unmarshalled_from_json/prose.js"

export const Error: interface_.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'unexpected properties': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("unexpected properties:"),
                sh.ph.indent(
                    sh.pg.sentences(p_.from.dictionary($['unexpected properties']).convert_to_list(
                        ($, key) => sh.sentence([
                            sh.ph.literal(key),
                            // sh.ph.literal(": "),
                            // t_astn_location_to_prose.Range($, {'character location reporting': }),
                        ])))
                ),
            ]))
            case 'missing property': return p_.option($, ($) => sh.ph.literal("missing property"))
            case 'unexpected type': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("unexpected type, expected:"),
                sh.ph.indent(
                    sh.pg.sentences(
                        p_.from.list($.expected).map(
                            ($) => sh.sentence([
                                sh.ph.literal($),
                            ])
                        )
                    )
                ),
            ]))
            case 'unexpected enum value': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("unexpected enum value, expected:"),
                sh.ph.indent(
                    sh.pg.sentences(p_.from.list($.expected).map(
                        ($) => sh.sentence([
                            sh.ph.literal($),
                        ])))
                ),
            ]))
            case 'multiple properties with this key': return p_.option($, ($) => sh.ph.literal("multiple properties with this key: " + $))

            default: return p_.exhaustive($[0])
        }
    })