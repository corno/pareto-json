import * as p_ from 'pareto-core/implementation/transformer'

import * as s_in from "../schema.js"
import * as s_out from "astn-core/modules/deserialization/schemas/location/schema"


//dependencies
import * as t_deserialize_parse_tree_to_location from "astn-core/modules/deserialization/schemas/parse_tree_deserialization/transformers/location"

export const Error: p_.Transformer<s_in.Error, s_out.Possible_Range> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialization': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'deserialize astn parse tree': return p_.option($, ($) => t_deserialize_parse_tree_to_location.Error($))
                        case 'jsonify': return p_.option($, ($) => ['range', $.range])
                        default: return p_.exhaustive($[0])
                    }
                }))
            case 'unmarshalling': return p_.option($, ($) => ['range', $.range])
            default: return p_.exhaustive($[0])
        }
    }
)