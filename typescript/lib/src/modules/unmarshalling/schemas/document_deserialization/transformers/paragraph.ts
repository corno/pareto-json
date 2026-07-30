import * as p_ from 'pareto-core/implementation/transformer'

import * as s_in from "../schema.js"
import * as s_out from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"

//dependencies
import * as ser_deserialize_parse_tree from "../../../../deserialization/schemas/deserialization/serializers.js"
import * as t_json_value_unmarshalling_to_paragraph from "../../json_value_unmarshalling/transformers/paragraph.js"

import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/target"

export const Error: p_.Transformer<s_in.Error, s_out.Phrase> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialization': return p_.ss($, ($) => sh.ph.text(ser_deserialize_parse_tree.Error($)))
            case 'unmarshalling': return p_.ss($, ($) => t_json_value_unmarshalling_to_paragraph.Error($))
            default: return p_.au($[0])
        }
    }
)