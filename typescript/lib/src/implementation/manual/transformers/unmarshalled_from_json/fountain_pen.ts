import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshalled_from_json"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

//dependencies


export const Error = ($: d_in.Error): d_out.Phrase => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'unexpected properties': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("unexpected properties:"),
            sh.ph.indent(
                sh.pg.sentences($['unexpected properties'].__to_list(($, key) => sh.sentence([
                    sh.ph.literal(key),
                    // sh.ph.literal(": "),
                    // t_astn_location_to_fountain_pen.Range($, {'character location reporting': }),
                ])))
            ),
        ]))
        case 'missing property': return _p.ss($, ($) => sh.ph.literal("missing property"))
        case 'unexpected type': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("unexpected type, expected:"),
            sh.ph.indent(
                sh.pg.sentences(
                    $.expected.__l_map(
                        ($) => sh.sentence([
                            sh.ph.literal($),
                        ])
                    )
                )
            ),
        ]))
        case 'unexpected enum value': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("unexpected enum value, expected:"),
            sh.ph.indent(
                sh.pg.sentences($.expected.__l_map(($) => sh.sentence([
                    sh.ph.literal($),
                ])))
            ),
        ]))
        case 'multiple properties with this key': return _p.ss($, ($) => sh.ph.literal("multiple properties with this key: " + $))

        default: return _p.au($[0])
    }
})